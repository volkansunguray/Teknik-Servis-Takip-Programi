using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeknikServisAPI.Models
{
    public class Personel
    {
        public long id { get; set; } = 0;
        public string personel_adi { get; set; } = "";
        public string personel_eposta { get; set; } = "";
    }
}
