import { useForm, router } from "@inertiajs/react";

export default function Register(){
    const form = useForm({
        name: '',
        email: '',
        password: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        form.post('/register', {
            onSuccess: () => {
                form.reset();

            },
            onError: (errors) => console.log(errors),
        });
    };
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={form.data.name} onChange={e => form.setData('name', e.target.value)} placeholder="Name" />
                <input type="email" value={form.data.email} onChange={e => form.setData('email', e.target.value)} placeholder="Email" />
                <input type="password" value={form.data.password} onChange={e => form.setData('password', e.target.value)} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </>
    )
}