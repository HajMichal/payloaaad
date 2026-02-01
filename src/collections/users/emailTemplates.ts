export const verifyEmailTemplate = (token: string, email: string) => {

    const verifyEmailURL = `${process.env.NEXT_PUBLIC_URL}/verify?token=${token}`
    return `
        <!doctype html>
        <html>
            <body>
                <h1>Here is my custom email template!</h1>
                <p>Hello, ${email}!</p>
                <p>Click below to verify your email.</p>
                <p>
                <a href="${verifyEmailURL}">${verifyEmailURL}</a>
                </p>
            </body>
        </html>
        `
}
export const resetPasswordTemplate = (token: string, email: string) => {
    const resetPasswordURL = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`
    return `
        <!doctype html>
        <html>
            <body>
                <h1>Here is my custom email template!</h1>
                <p>Hello, ${email}!</p>
                <p>Click below to reset your password.</p>
                <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
                </p>
            </body>
        </html>
        `
}