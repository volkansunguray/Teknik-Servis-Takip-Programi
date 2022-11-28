using Dapper;
using TeknikServisAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace TeknikServisAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class personelController : Controller
    {
        string connStr = @"DATA SOURCE=localhost\SQLEXPRESS; INITIAL CATALOG=TEKNIK_SERVIS; USER ID=sa; PASSWORD=123#; Trusted_Connection=true;";
        SqlConnection conn;

        public personelController()
        {
            conn = new SqlConnection(connStr);
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

        private void servisGecerlilikKontrolu(TeknikServis model)
        {
            string hataMesaji = "";
            if (model.id < 1) model.baslangic_tarihi = DateTime.Now;
            if (model.personel_id < 1) hataMesaji += "Personel seçimi yapılmamış";
            if (string.IsNullOrEmpty(model.servis_tanim)) hataMesaji += "Servis tanımını boş geçemezsiniz!";
            model.teslim_tarihi = DateTime.Now;

            if (!string.IsNullOrEmpty(hataMesaji)) throw new Exception(hataMesaji);
        }
    }
}
