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
    public class TeknikServisController : Controller
    {
        string connStr = @"DATA SOURCE=localhost\SQLEXPRESS; INITIAL CATALOG=TEKNIK_SERVIS; USER ID=sa; PASSWORD=123#; Trusted_Connection=true;";
        SqlConnection conn;

        public TeknikServisController()
        {
            conn = new SqlConnection(connStr);
        }

        [HttpGet("")]
        public IActionResult listele(string? arama, int id)
        {
            //var gorevListe = conn.Query<TeknikServis>("Select * from tbl_teknikservis");
            //return Ok(gorevListe);
            List<TeknikServis> teknikServisListe = new List<TeknikServis>();
            string sorgu = "Select * from tbl_teknikservis where (1 = 1) ";
            if (id > 0) sorgu += " and id = @prmid";
            if (!string.IsNullOrEmpty(arama))
            {
                arama = "%" + arama + "%";
                sorgu += " and (servis_tanim like @prmarama1 or servis_aciklama like @prmarama2)";
            }
            var sqlParams = new { prmid = id, prmarama1 = arama, prmarama2 = arama };
            teknikServisListe = conn.Query<TeknikServis>(sorgu, sqlParams).ToList();
            
            return Ok(teknikServisListe);
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

        [HttpPut("{id}")]
        public IActionResult servisGuncelle(int id, TeknikServis model)
        {
            try
            {
                servisGecerlilikKontrolu(model);
                string sorgu = "";
                sorgu = @"
                update
                   tbl_teknikservis 
                set 
                    --id=@id, 
                    servis_tanim=@servis_tanim, 
                    servis_aciklama=@servis_aciklama, 
                    servis_tarihi=@servis_tarihi, 
                    baslangis_tarihi=@baslangic_tarihi, 
                    teslim_tarihi = @teslim_tarihi, 
                    personel_id=@personel_id,
                    ariza_durum=@ariza_durum where id=@id";

                var parametre = new
                {
                    id = model.id,
                    servis_tanim = model.servis_tanim,
                    servis_aciklama = model.servis_aciklama,
                    baslangic_tarihi = model.baslangic_tarihi,
                    teslim_tarihi = model.teslim_tarihi,
                    personel_id = model.personel_id,
                    ariza_durum = model.ariza_durum
                };
                conn.Execute(sorgu, parametre);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost]
        public IActionResult servisEkle(TeknikServis model)
        {
            try
            {
                servisGecerlilikKontrolu(model);
                string sorgu = @"
                    insert into tbl_teknikservis (
                        servis_tanim, 
                        servis_aciklama, 
                        baslangic_tarihi, 
                        teslim_tarihi,
                        personel_id, 
                        ariza_durum
                    ) 
                    values (
                        @servis_tanim, 
                        @servis_aciklama, 
                        @baslangic_tarihi, 
                        @teslim_tarihi, 
                        @personel_id, 
                        @ariza_durum);
                    SELECT CAST(SCOPE_IDENTITY() as bigint);";
                var parametre = new
                {
                    id = model.id,
                    servis_tanim = model.servis_tanim,
                    servis_aciklama = model.servis_aciklama,
                    baslangic_tarihi = model.baslangic_tarihi,
                    teslim_tarihi = model.teslim_tarihi,
                    personel_id = model.personel_id,
                    ariza_durum = model.ariza_durum
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
        public IActionResult gorevSil(int id)
        {
            string sorgu = "delete from tbl_teknikservis where id = @id";

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
    }
}
