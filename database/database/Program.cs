using Microsoft.EntityFrameworkCore.Storage;
using System.Threading.Tasks;

namespace database
{
    internal class Program
    {
        static void Main(string[] args)
        {
            AddNote("It", " Works");
            Note[] notes = GetNotes();

            Console.WriteLine(notes[0].Title + notes[0].Content);
        }

        public static void AddNote(string title, string content)
        {
            using NotesContext db = new NotesContext();

            db.Add(new Note { Content = content, Title = title });
            db.SaveChanges();
        }

        public static void RemoveNote(int id)
        {

        }

        public static Note[] GetNotes()
        {
            using NotesContext db = new NotesContext();

            Note[] notes = db.Notes
                .OrderBy(n => n.NoteId)
                .ToArray();

            return notes;
        }
    }
}
