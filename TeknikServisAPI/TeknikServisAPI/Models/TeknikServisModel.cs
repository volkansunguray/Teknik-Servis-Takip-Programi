using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeknikServisAPI.Models
{
    public class TeknikServis
    {
        public long id { get; set; } = 0;
        public string servis_tanim { get; set; } = "";
        public string servis_aciklama { get; set; } = "";
        public DateTime baslangic_tarihi { get; set; }
        public DateTime teslim_tarihi { get; set; }
        public long personel_id { get; set; }
        public long ariza_durum { get; set; } = 0;
        public long kaydeden_id { get; set; }

    }
}
