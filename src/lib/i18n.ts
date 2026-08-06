export type Lang = 'es' | 'en'

export const translations = {
  es: {
    // Home
    home_quote: '"El genio es aquel que tiene la valentía y el coraje de escuchar su propio corazón."',
    home_author: 'John Demartini',
    home_start: 'Empezar',
    home_login: 'Ya tengo cuenta',
    home_disclaimer: 'Esta app no es un servicio médico ni terapéutico.\nSi estás siguiendo una terapia o tratamiento, sigue haciéndolo.',
    home_contact: 'Contacto',

    // Login
    login_title: 'Bienvenido de nuevo',
    login_subtitle: 'Tu reflexión te espera.',
    login_email: 'Tu email',
    login_password: 'Contraseña',
    login_submit: 'Entrar',
    login_loading: 'Entrando…',
    login_error: 'Email o contraseña incorrectos.',
    login_no_account: '¿No tienes cuenta?',
    login_create: 'Crear una',
    login_forgot: '¿Olvidaste tu contraseña?',
    login_reset: 'Recupérala aquí',

    // Signup
    signup_title: 'Crea tu cuenta',
    signup_subtitle: 'Empieza con 11 preguntas. Dura 2 minutos.',
    signup_email: 'Tu email',
    signup_password: 'Contraseña (mín. 8 caracteres)',
    signup_submit: 'Crear cuenta',
    signup_loading: 'Creando cuenta…',
    signup_error: 'Algo ha fallado. Intenta de nuevo.',
    signup_error_short: 'La contraseña debe tener al menos 8 caracteres.',
    signup_have_account: '¿Ya tienes cuenta?',
    signup_login: 'Entrar',
    signup_disclaimer: 'Esta app no es un servicio médico ni terapéutico.\nSi estás siguiendo una terapia o tratamiento, sigue haciéndolo.',
    signup_success: '¡Suscripción completada con éxito!',
    signup_success_sub: 'Crea tu cuenta para acceder a tu recorrido.',

    // Reset password
    reset_title: 'Nueva contraseña',
    reset_subtitle: 'Elige una contraseña segura.',
    reset_placeholder: 'Nueva contraseña',
    reset_submit: 'Guardar contraseña',
    reset_loading: 'Guardando…',
    reset_success: 'Contraseña actualizada. Redirigiendo…',
    reset_error: 'Algo ha fallado. Intenta de nuevo.',
  },
  en: {
    // Home
    home_quote: '"Genius is the one who has the courage and bravery to listen to their own heart."',
    home_author: 'John Demartini',
    home_start: 'Get started',
    home_login: 'I already have an account',
    home_disclaimer: 'This app is not a medical or therapeutic service.\nIf you are following a therapy or treatment, please continue doing so.',
    home_contact: 'Contact',

    // Login
    login_title: 'Welcome back',
    login_subtitle: 'Your reflection is waiting.',
    login_email: 'Your email',
    login_password: 'Password',
    login_submit: 'Log in',
    login_loading: 'Logging in…',
    login_error: 'Incorrect email or password.',
    login_no_account: "Don't have an account?",
    login_create: 'Create one',
    login_forgot: 'Forgot your password?',
    login_reset: 'Recover it here',

    // Signup
    signup_title: 'Create your account',
    signup_subtitle: 'Start with 11 questions. Takes 2 minutes.',
    signup_email: 'Your email',
    signup_password: 'Password (min. 8 characters)',
    signup_submit: 'Create account',
    signup_loading: 'Creating account…',
    signup_error: 'Something went wrong. Please try again.',
    signup_error_short: 'Password must be at least 8 characters.',
    signup_have_account: 'Already have an account?',
    signup_login: 'Log in',
    signup_disclaimer: 'This app is not a medical or therapeutic service.\nIf you are following a therapy or treatment, please continue doing so.',
    signup_success: 'Subscription completed successfully!',
    signup_success_sub: 'Create your account to access your journey.',

    // Reset password
    reset_title: 'New password',
    reset_subtitle: 'Choose a secure password.',
    reset_placeholder: 'New password',
    reset_submit: 'Save password',
    reset_loading: 'Saving…',
    reset_success: 'Password updated. Redirecting…',
    reset_error: 'Something went wrong. Please try again.',
  },
}

export function t(lang: Lang, key: keyof typeof translations['es']): string {
  return translations[lang][key] ?? translations['es'][key]
}
