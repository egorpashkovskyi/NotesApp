using Microsoft.EntityFrameworkCore;

namespace database
{
    public class NotesContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }
        public string DbPath { get; }

        public NotesContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "notes.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
    }

    public class Note
    {
        public int NoteId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
