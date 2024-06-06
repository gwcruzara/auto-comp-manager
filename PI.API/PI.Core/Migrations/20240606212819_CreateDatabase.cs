using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PI.Core.Migrations
{
    public partial class CreateDatabase : Migration
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CarNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Distance = table.Column<double>(type: "float", nullable: false),
                    Ranking = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<double>(type: "float", nullable: false),
                    IdSquad = table.Column<int>(type: "int", nullable: false)
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<double>(type: "float", nullable: false),
                    TimeWithoutPenalties = table.Column<double>(type: "float", nullable: false),
                    Ranking = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<double>(type: "float", nullable: false),
                    BurnedStart = table.Column<bool>(type: "bit", nullable: false),
                    OutsideLine = table.Column<int>(type: "int", nullable: false),
                    CutWay = table.Column<int>(type: "int", nullable: false),
                    IdSquad = table.Column<int>(type: "int", nullable: false)
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Job = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IdSquad = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Student_Squad_IdSquad",
                        column: x => x.IdSquad,
                        principalSchema: "dbo",
                        principalTable: "Squad",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Traction",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Weight = table.Column<double>(type: "float", nullable: false),
                    Ranking = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<double>(type: "float", nullable: false),
                    IdSquad = table.Column<int>(type: "int", nullable: false)
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
                name: "Ramp",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Speed",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Student",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Traction",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Squad",
                schema: "dbo");
        }
    }
}
