using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SignalRTasks.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "TaskItems",
                newName: "UserID");

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "TaskItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_UserID",
                table: "TaskItems",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_Users_UserID",
                table: "TaskItems",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_Users_UserID",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_UserID",
                table: "TaskItems");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "TaskItems",
                newName: "UserId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "TaskItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
