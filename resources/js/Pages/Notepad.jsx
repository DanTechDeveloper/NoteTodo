import { useForm } from "@inertiajs/react";
export default function Notepad({notepad = []}){
    const {data, setData, post, processing, errors, reset} = useForm({
        title: "",
        content: "",
    });
    console.table(notepad)
    const handleOnSubmit = (e) => {
        e.preventDefault();
        post("/notepad", {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => console.log(errors),
        });
    };
    return <>
      <form onSubmit={handleOnSubmit}>
        <input type="text" value={data.title} onChange={(e) => setData("title", e.target.value)} placeholder="Title" />
        <input type="text" value={data.content} onChange={(e) => setData("content", e.target.value)} placeholder="Content" />
        <button type="submit" disabled={processing}>{processing ? "Sending..." : "Submit"}</button>
        {notepad.map((note) => (
            <div key={note.id}>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
            </div>
        ))}
      </form>
    </>
}