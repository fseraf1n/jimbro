'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeMinimal, ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ThemeProvider } from 'next-themes'
// import { Database } from './database.types'

export default function AuthForm() {
  const supabase = createClientComponentClient()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa, extend: false, className: {
        button: "bg-slate-400 self-end p-3 m-3 text-white text-secondary-foreground w-1/2 shadow-sm rounded-xl font-mono tracking-wide text-sm",
        container: "flex flex-col gap-2",
        divider: "",
        input: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-5",
        label: "text-sm font-medium text-muted-foreground p-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      }}}
      localization={{
        variables: {
          magic_link: {
            email_input_placeholder: 'ur email address',
            email_input_label: 'email address',
            button_label: 'magic login',
            confirmation_text: 'check email'
          },
        },
      }}
      theme="default"
      showLinks={false}
      providers={[]}
      redirectTo='http://192.168.1.140:3000/auth/callback'
    //   redirectTo={`${process.env.NEXT_PUBLIC_HOST}/auth/callback`}
    />
  )
}