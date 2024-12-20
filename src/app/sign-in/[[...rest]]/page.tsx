import { SignIn } from "@clerk/nextjs";

type SignInPageProps = {
    searchParams: {
        redirectUrl: string;
    }
}

export default function SignInPage({ searchParams: { redirectUrl }}: SignInPageProps) {

    return (
        <section className="flex items-center justify-center h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="flex justify-center">
                    <SignIn signUpUrl="/sign-up" redirectUrl={redirectUrl} />
                </div>
            </div>
        </section>
    );
}