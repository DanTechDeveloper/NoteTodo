import { useForm, Link} from '@inertiajs/react';

export default function Login() {
    const formAttributes = [
        { label: "email", type: "email" },
        { label: "password", type: "password" },
    ];

    const { data, setData, post, errors } = useForm({
        email: "",
        password: ""
    });

    const handleOnChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/Login');
    };

    return (
        <form onSubmit={submit}>
            {formAttributes.map((field, index) => (
                <div key={index} className="flex flex-col">
                    <label>{field.label}</label>
                    <input
                        type={field.type}
                        name={field.label}
                        value={data[field.label]}
                        onChange={handleOnChange}
                    />
                    {errors[field.label] && <div className="text-red-500 text-sm mt-1">{errors[field.label]}</div>}
                </div>
            ))}
            <button type="submit">SUBMIT</button>
            <Link href="/register">REGISTER</Link>
        </form>
    );
}