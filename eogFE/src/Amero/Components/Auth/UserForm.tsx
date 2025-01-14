import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import imageOne from "../../../../public/assets/images/logo/logo.png"
import imageTwo from "../../../../public/assets/images/logo/logo-dark.png"
import { signIn } from "next-auth/react"

export const UserForm = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/dashboard/ecommerce",
        });

        if (result?.ok) {
            toast.success("successfully Logged in Rediract......")
            router.push(result.url || "/dashboard/ecommerce");
        } else {
            toast.error("Invalid Credentaial...");
        }
    };
    return (
        <div>
            <div>
                <Link className="logo" href="/login">
                    <Image width={250} height={50} className="img-fluid for-light" src={imageOne} alt="login page" priority />
                    <Image width={250} height={50} className="img-fluid for-dark" src={imageTwo} alt="login page" priority />
                </Link>
            </div>
            <div className="login-main">
                <Form className="theme-form" onSubmit={(event)=>formSubmitHandle(event)}>
                    <h2 className="text-center">Iniciar sesión en la cuenta</h2>
                    <p className="text-center">Introduce tu usuario y contraseña para iniciar sesión</p>
                    <FormGroup>
                        <Label className="col-form-label">Usuario</Label>
                        <Input type="email" defaultValue={email} onChange={(event) => setEmail(event.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-form-label">Contraseña</Label>
                        <div className="position-relative form-input">
                            <Input type={show ? "text" : "password"} defaultValue={password} onChange={(event) => setPassword(event.target.value)} placeholder="******" />
                            <div className="show-hide" onClick={() => setShow(!show)}><span className="show"> </span></div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-0 checkbox-checked">
                        <FormGroup className="checkbox-solid-info" check>
                            <Input id="checkbox1" type="checkbox" />
                            <Label className="text-muted" htmlFor="checkbox1">Recordar contraseña</Label>
                        </FormGroup>
                        <Link className="link" href={`/authentication/forget_password`}>¿Has olvidado tu contraseña?</Link>
                        <div className="text-end mt-3"><Button type="submit" color="primary" block>Iniciar sesión</Button></div>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
};
