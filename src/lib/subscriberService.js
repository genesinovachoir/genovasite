import { supabase } from './supabaseClient';

export async function subscribeUser({ email, name = null, source }) {

    if (!email) {
        return { success: false, error: 'Email required' };
    }

    try {

        const { error } = await supabase
            .from('subscribers')
            .insert([
                {
                    email,
                    name,
                    source
                }
            ]);

        if (error && error.code !== '23505') {
            console.error('Subscriber insert error:', error);
            return { success: false, error };
        }


        return { success: true };

    } catch (err) {

        console.error('Unexpected subscriber error:', err);

        return { success: false, error: err };
    }
}
