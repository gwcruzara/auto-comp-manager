using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using PI.Core.DataContext;
using PI.Core.Services;
using PI.Domain;
using PI.Domain.Interfaces;
using PI.Domain.Services;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.


builder.Services.AddSpaStaticFiles(directory =>
{
    directory.RootPath = "PI-UI";
});

builder.Services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

builder.Services.AddDbContext<AutoCompManagerContext>(options =>
{
    options.UseSqlServer(configuration.GetConnectionString("AutoCompManager"));
});

builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ISquadService, SquadService>();
builder.Services.AddScoped<ISpeedService, SpeedService>();
builder.Services.AddScoped<ITractionService, TractionService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(cors => cors.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseStaticFiles();

app.UseSpaStaticFiles();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = Path.Combine(Directory.GetCurrentDirectory(), "PI-UI");
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();