using Microsoft.EntityFrameworkCore.Storage;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace database
{
  internal class Program
  {
    static void Main(string[] args)
    {
      AddNote("It", " Works");
      for (int i = 0; i < 1000; i++)
      {
        SimpleListenerExample(["http://localhost:5000/"]);
      }

      Console.WriteLine("1000 iterations done");
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

    public static void SimpleListenerExample(string[] prefixes)
    {
      if (!HttpListener.IsSupported)
      {
        Console.WriteLine("Windows XP SP2 or Server 2003 is required to use the HttpListener class.");
        return;
      }

      // URI prefixes are required,
      // for example "http://contoso.com:8080/index/".
      if (prefixes == null || prefixes.Length == 0)
        throw new ArgumentException("prefixes");

      // Create a listener.
      HttpListener listener = new HttpListener();
      // Add the prefixes.
      foreach (string s in prefixes)
      {
        listener.Prefixes.Add(s);
      }
      listener.Start();
      Console.WriteLine("Listening...");
      // Note: The GetContext method blocks while waiting for a request.
      HttpListenerContext context = listener.GetContext();
      HttpListenerRequest request = context.Request;
      // Obtain a response object.
      HttpListenerResponse response = context.Response;
      // Construct a response.
      Note[] notes = GetNotes();
      string responseNotes = JsonSerializer.Serialize(notes);
      //string responseString = "<HTML><BODY> Hello world!</BODY></HTML>";
      string responseString = responseNotes;
      byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
      // Get a response stream and write the response to it.
      response.ContentLength64 = buffer.Length;
      System.IO.Stream output = response.OutputStream;
      output.Write(buffer, 0, buffer.Length);
      // You must close the output stream.
      output.Close();
      listener.Stop();
    }
  }
}
