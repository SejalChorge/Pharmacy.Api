using System.Text.Json;
using Pharmacy.Api.Models;

namespace Pharmacy.Api.Services;

public class JsonStorageService
{
    private readonly string _medicineFile;
    private readonly string _salesFile;

    public JsonStorageService(IWebHostEnvironment env)
    {
        var dataFolder = Path.Combine(env.ContentRootPath, "Data");

        _medicineFile = Path.Combine(dataFolder, "medicines.json");
        _salesFile = Path.Combine(dataFolder, "sales.json");
    }

    public async Task<List<Medicine>> GetMedicinesAsync()
    {
        if (!File.Exists(_medicineFile))
            return new List<Medicine>();

        var json = await File.ReadAllTextAsync(_medicineFile);

        if (string.IsNullOrWhiteSpace(json))
            return new List<Medicine>();

        return JsonSerializer.Deserialize<List<Medicine>>(json)
               ?? new List<Medicine>();
    }

    public async Task SaveMedicinesAsync(List<Medicine> medicines)
    {
        var json = JsonSerializer.Serialize(
            medicines,
            new JsonSerializerOptions
            {
                WriteIndented = true
            });

        await File.WriteAllTextAsync(_medicineFile, json);
    }

    public async Task<List<SaleRecord>> GetSalesAsync()
    {
        if (!File.Exists(_salesFile))
            return new List<SaleRecord>();

        var json = await File.ReadAllTextAsync(_salesFile);

        if (string.IsNullOrWhiteSpace(json))
            return new List<SaleRecord>();

        return JsonSerializer.Deserialize<List<SaleRecord>>(json)
               ?? new List<SaleRecord>();
    }

    public async Task SaveSalesAsync(List<SaleRecord> sales)
    {
        var json = JsonSerializer.Serialize(
            sales,
            new JsonSerializerOptions
            {
                WriteIndented = true
            });

        await File.WriteAllTextAsync(_salesFile, json);
    }
}