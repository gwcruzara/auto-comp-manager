using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PI.Core.Migrations
{
    public partial class InitalSqlLite : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "Squad",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    CarNumber = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Squad", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ramp",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Distance = table.Column<double>(type: "REAL", nullable: false),
                    Ranking = table.Column<int>(type: "INTEGER", nullable: false),
                    Score = table.Column<double>(type: "REAL", nullable: false),
                    IdSquad = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ramp", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ramp_Squad_IdSquad",
                        column: x => x.IdSquad,
                        principalSchema: "dbo",
                        principalTable: "Squad",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Speed",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Time = table.Column<double>(type: "REAL", nullable: false),
                    TimeWithoutPenalties = table.Column<double>(type: "REAL", nullable: false),
                    Ranking = table.Column<int>(type: "INTEGER", nullable: false),
                    Score = table.Column<double>(type: "REAL", nullable: false),
                    BurnedStart = table.Column<bool>(type: "INTEGER", nullable: false),
                    OutsideLine = table.Column<int>(type: "INTEGER", nullable: false),
                    CutWay = table.Column<int>(type: "INTEGER", nullable: false),
                    IdSquad = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speed", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Speed_Squad_IdSquad",
                        column: x => x.IdSquad,
                        principalSchema: "dbo",
                        principalTable: "Squad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Student",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Job = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    IdSquad = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Student_Squad_IdSquad",
                        column: x => x.IdSquad,
                        principalSchema: "dbo",
                        principalTable: "Squad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Traction",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Weight = table.Column<double>(type: "REAL", nullable: false),
                    Ranking = table.Column<int>(type: "INTEGER", nullable: false),
                    Score = table.Column<double>(type: "REAL", nullable: false),
                    IdSquad = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Traction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Traction_Squad_IdSquad",
                        column: x => x.IdSquad,
                        principalSchema: "dbo",
                        principalTable: "Squad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Penalties",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Time = table.Column<int>(type: "INTEGER", nullable: false),
                    IdSpeed = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Penalties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Penalties_Speed_IdSpeed",
                        column: x => x.IdSpeed,
                        principalSchema: "dbo",
                        principalTable: "Speed",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Penalties_IdSpeed",
                schema: "dbo",
                table: "Penalties",
                column: "IdSpeed");

            migrationBuilder.CreateIndex(
                name: "IX_Ramp_IdSquad",
                schema: "dbo",
                table: "Ramp",
                column: "IdSquad");

            migrationBuilder.CreateIndex(
                name: "IX_Speed_IdSquad",
                schema: "dbo",
                table: "Speed",
                column: "IdSquad");

            migrationBuilder.CreateIndex(
                name: "IX_Student_IdSquad",
                schema: "dbo",
                table: "Student",
                column: "IdSquad");

            migrationBuilder.CreateIndex(
                name: "IX_Traction_IdSquad",
                schema: "dbo",
                table: "Traction",
                column: "IdSquad");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Penalties",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Ramp",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Student",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Traction",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Speed",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Squad",
                schema: "dbo");
        }
    }
}
