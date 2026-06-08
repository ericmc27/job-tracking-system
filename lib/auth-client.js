import { createAuthClient } from "better-auth/react"

export const { signIn, useSession } = createAuthClient({sessionOptions: {refetchOnWindowFocus: false}})

//refetchOnWindowFocus must be removed!