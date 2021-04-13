using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Car_Manufacture.Models;

namespace Car_Manufacture.Data
{
    public class Car_ManufactureContext : DbContext
    {
        public Car_ManufactureContext (DbContextOptions<Car_ManufactureContext> options)
            : base(options)
        {
        }

        public DbSet<Car_Manufacture.Models.Cars> Cars { get; set; }
    }
}
