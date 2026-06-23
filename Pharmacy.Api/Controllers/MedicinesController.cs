using Microsoft.AspNetCore.Mvc;
using Pharmacy.Api.Models;
using Pharmacy.Api.Services;

namespace Pharmacy.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicinesController : ControllerBase
{
    private readonly JsonStorageService _storage;

    public MedicinesController(JsonStorageService storage)
    {
        _storage = storage;
    }

    [HttpGet]
    public async Task<ActionResult<List<Medicine>>> Get()
    {
        var medicines = await _storage.GetMedicinesAsync();
        return Ok(medicines);
    }

    [HttpPost]
    public async Task<ActionResult> AddMedicine(Medicine medicine)
    {
        if (medicine.Quantity < 0)
            return BadRequest("Quantity cannot be negative");

        if (medicine.Price <= 0)
            return BadRequest("Price must be greater than zero");

        var medicines = await _storage.GetMedicinesAsync();

        medicine.Id = medicines.Any()
            ? medicines.Max(x => x.Id) + 1
            : 1;

        medicines.Add(medicine);

        await _storage.SaveMedicinesAsync(medicines);

        return Ok(medicine);
    }
}