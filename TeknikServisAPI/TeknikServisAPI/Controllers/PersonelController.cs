using Dapper;
using TeknikServisAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

namespace TeknikServisAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class personelController : Controller
    {
        string connStr = @"DATA SOURCE=localhost\SQLEXPRESS; INITIAL CATALOG=TEKNIK_SERVIS; USER ID=sa; PASSWORD=123#; Trusted_Connection=true;";
        SqlConnection conn;

        private readonly IConfiguration _config;

        public personelController(IConfiguration config)
        {
            conn = new SqlConnection(connStr);
            _config = config;
        }

        [HttpGet("")]
        public IActionResult listele(int id)
        {
            //List<Personel> personelListe = new List<Personel>();
            string sorgu = "";

            if (id > 0)
                sorgu = "Select * from tbl_personel where id = " + id;
            else
                sorgu = "Select * from tbl_personel";

            var personelListe = conn.Query<Personel>(sorgu);
            return Ok(personelListe);
        }

        private void ServisGecerlilikKontrolu(TeknikServis model)
        {
            string hataMesaji = "";
            if (model.id < 1) model.baslangic_tarihi = DateTime.Now;
            if (model.personel_id < 1) hataMesaji += "Personel seçimi yapılmamış";
            if (string.IsNullOrEmpty(model.servis_tanim)) hataMesaji += "Servis tanımını boş geçemezsiniz!";
            model.teslim_tarihi = DateTime.Now;

            if (!string.IsNullOrEmpty(hataMesaji)) throw new Exception(hataMesaji);
        }

        [HttpPost]
        public IActionResult Login(Personel personel)
        {
            //List<Personel> personelListe = new List<Personel>();
            try
            {
                if (string.IsNullOrEmpty(personel.personel_eposta)) throw new Exception("E-posta adresi boş olamaz!"); 
                string sorgu = "select * from tbl_personel where personel_eposta = @eposta and personel_sifre = @sifre";
                var prm = new { eposta = personel.personel_eposta, sifre = personel.personel_sifre };
                var aPersonel = conn.Query<Personel>(sorgu, prm).FirstOrDefault();
                if (aPersonel == null) throw new Exception("Kullanıcı bulunamadı!");
                var token = GenerateToken(personel.personel_eposta);
                return Ok(new
                {
                    aPersonel,
                    JwtKey = token
                });
            }
            catch (Exception e)
            {
                return BadRequest("HATA OLUŞTU: " + e.Message);
            }
        }

        private string GenerateToken(string personel_eposta)
        {
            var tokenhandler = new JwtSecurityTokenHandler();
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:SecurityKey"]));
            var credential = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email,personel_eposta),
                new Claim("VolkanSunguray","Teknik Servis Takip Programı")
            };
            var token = new JwtSecurityToken(
                issuer: _config["Token:Issuer"],
                audience: _config["Token:Issuer"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credential
            );
            return tokenhandler.WriteToken(token);
        }
    }
}
