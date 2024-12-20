import { SignUp } from "@clerk/nextjs";

type SignUpPageProps = {
    searchParams: {
        redirectUrl: string
    }
}

export default function SignUpPage({ searchParams: { redirectUrl }}: SignUpPageProps) {

    return (
        <section className="flex items-center justify-center h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="flex justify-center">
                    <SignUp signInUrl="/sign-in" redirectUrl={redirectUrl} />
                </div>
            </div>
        </section>
    );
}