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

        private void personelGecerlilikKontrolu(Personel model)
        {
            string hataMesaji = "";
            if (string.IsNullOrEmpty(model.personel_adi)) hataMesaji += "Personel isim girişi yapılmamış.";
            if (string.IsNullOrEmpty(model.personel_eposta)) hataMesaji += "Personel E-Posta'yı boş geçemezsiniz!";
            if (string.IsNullOrEmpty(model.personel_sifre)) hataMesaji += "Personel şifresini boş geçemezsiniz!";
            if (string.IsNullOrEmpty(model.personel_yetki)) hataMesaji += "Personel yetkiyi boş geçemezsiniz!";

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

        [HttpPost("yonetim")]
        public IActionResult LoginYonetim(Personel personel)
        {
            //List<Personel> personelListe = new List<Personel>();
            try
            {
                if (string.IsNullOrEmpty(personel.personel_eposta)) throw new Exception("E-posta adresi boş olamaz!");
                string sorgu = "select * from tbl_personel where personel_eposta = @eposta and personel_sifre = @sifre and personel_yetki = 'Yönetici'";
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

        [HttpPost("kayit")]
        public IActionResult PersonelEkle(Personel model)
        {
            try
            {
                personelGecerlilikKontrolu(model);
                string sorgu = @"
                    insert into tbl_personel (
                        personel_adi, 
                        personel_eposta, 
                        personel_sifre, 
                        personel_telefon,
                        personel_yetki
                    ) 
                    values (
                        @personel_adi, 
                        @personel_eposta, 
                        @personel_sifre, 
                        @personel_telefon, 
                        @personel_yetki);
                    SELECT CAST(SCOPE_IDENTITY() as int);";
                var parametre = new
                {
                    id = model.id,
                    personel_adi = model.personel_adi,
                    personel_eposta = model.personel_eposta,
                    personel_sifre = model.personel_sifre,
                    personel_telefon = model.personel_telefon,
                    personel_yetki = model.personel_yetki
                };
                model.id = conn.QueryFirstOrDefault<long>(sorgu, parametre);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult personelSil(int id)
        {
            string sorgu = "delete from tbl_personel where id = @id";

            var parametre = new
            {
                id = id
            };

            using (SqlConnection sqlsilme = new SqlConnection(connStr))
            {
                sqlsilme.Execute(sorgu, parametre);
            }
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult personelGuncelle(int id, Personel model)
        {
            try
            {
                personelGecerlilikKontrolu(model);
                string sorgu = "";
                sorgu = @"
                update
                   tbl_personel 
                set 
                    --id=@id, 
                    personel_adi=@personel_adi, 
                    personel_eposta=@personel_eposta, 
                    personel_sifre=@personel_sifre, 
                    personel_telefon = @personel_telefon, 
                    personel_yetki=@personel_yetki where id=@id";

                var parametre = new
                {
                    id = model.id,
                    personel_adi = model.personel_adi,
                    personel_eposta = model.personel_eposta,
                    personel_sifre = model.personel_sifre,
                    personel_telefon = model.personel_telefon,
                    personel_yetki = model.personel_yetki
                };
                conn.Execute(sorgu, parametre);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }



        private string GenerateToken(string personel_eposta)
        {
            var tokenhandler = new JwtSecurityTokenHandler();
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:SecurityKey"]));
            var credential = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email,personel_eposta)
            };
            var token = new JwtSecurityToken(
                issuer: _config["Token:Issuer"],
                audience: _config["Token:audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credential
            );
            return tokenhandler.WriteToken(token);
        }
    }
}
