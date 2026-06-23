using Microsoft.AspNetCore.Mvc;
using Pharmacy.Api.Models;
using Pharmacy.Api.Services;

namespace Pharmacy.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    private readonly JsonStorageService _storage;

    public SalesController(JsonStorageService storage)
    {
        _storage = storage;
    }

    [HttpGet]
    public async Task<ActionResult<List<SaleRecord>>> Get()
    {
        var sales = await _storage.GetSalesAsync();

        return Ok(sales);
    }

    [HttpPost]
    public async Task<ActionResult> AddSale(SaleRecord sale)
    {
        var medicines = await _storage.GetMedicinesAsync();

        var medicine = medicines.FirstOrDefault(
            x => x.Id == sale.MedicineId);

        if (medicine == null)
            return BadRequest("Medicine not found");

        if (medicine.Quantity < sale.QuantitySold)
            return BadRequest("Not enough stock");

        medicine.Quantity -= sale.QuantitySold;

        var sales = await _storage.GetSalesAsync();

        sale.Id = sales.Any()
            ? sales.Max(x => x.Id) + 1
            : 1;

        sale.SaleDate = DateTime.UtcNow;

        sales.Add(sale);

        await _storage.SaveMedicinesAsync(medicines);
        await _storage.SaveSalesAsync(sales);

        return Ok(sale);
    }
}