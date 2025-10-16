/* ************************************************************
                        NOTES
************************************************************ */
// Terms of Use public page
// Features: Dynamic content from Supabase with fallback
// Layout: Brand-styled sections with alternating colors
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function TermsOfUsePage() {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [content, setContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    useEffect(() => {
        const fetchTermsOfUse = async () => {
            try {
                const { data, error } = await supabase
                    .from('terms_of_use')
                    .select('content')
                    .eq('id', 'terms-of-use-1')
                    .single();

                if (error) {
                    if (error.code === 'PGRST116') {
                        console.log('No terms of use found, using fallback content');
                    } else if (error.code === '42P01') {
                        console.log('Terms of use table does not exist, using fallback content');
                    } else {
                        console.error('Error fetching terms of use:', error);
                    }
                } else {
                    setContent(data?.content || "");
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTermsOfUse();
    }, []);

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const
            }
        }
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-brand-black text-lg">Loading terms of use...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* ************************************************************
          HERO SECTION
      ************************************************************ */}
            <section className="bg-gradient-to-br from-brand-yellow/10 via-brand-teal/5 to-brand-yellow/10 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-6">
                            Terms of Use
                        </h1>
                        <p className="text-xl text-brand-black/70 max-w-3xl mx-auto">
                            Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ************************************************************
          CONTENT SECTION
      ************************************************************ */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    {content ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="space-y-8"
                        >
                            {/* Section 1 */}
                            <motion.div variants={itemVariants} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">1. Site Content (General Information Only)</h2>
                                <p className="text-brand-black/80">Information on the Site is of a general nature and is not legal, tax or financial advice.</p>
                            </motion.div>

                            {/* Section 2 */}
                            <motion.div variants={itemVariants} className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">2. Your Use of the Site</h2>
                                <p className="text-brand-black/80">You must not use the Site for unlawful purposes or disrupt its operation.</p>
                            </motion.div>

                            {/* Section 3 */}
                            <motion.div variants={itemVariants} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">3. Accounts & Security</h2>
                                <p className="text-brand-black/80">You are responsible for maintaining the security of your account credentials.</p>
                            </motion.div>

                            {/* Section 4 */}
                            <motion.div variants={itemVariants} className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">4. Intellectual Property</h2>
                                <p className="text-brand-black/80">We own or license all IP in the Site. You may view but not reproduce content without consent.</p>
                            </motion.div>

                            {/* Section 5 */}
                            <motion.div variants={itemVariants} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">5. Third-Party Links & Tools</h2>
                                <p className="text-brand-black/80">We are not responsible for Third-Party websites or tools linked from our Site.</p>
                            </motion.div>

                            {/* Section 6 */}
                            <motion.div variants={itemVariants} className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">6. Privacy</h2>
                                <p className="text-brand-black/80">Our Privacy Policy explains how we collect, use and disclose personal information.</p>
                            </motion.div>

                            {/* Section 7 */}
                            <motion.div variants={itemVariants} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">7. Disclaimers & Liability</h2>
                                <p className="text-brand-black/80">The Site is provided 'as is'. Liability is excluded to the extent permitted by law.</p>
                            </motion.div>

                            {/* Section 8 */}
                            <motion.div variants={itemVariants} className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">8. Changes to the Site</h2>
                                <p className="text-brand-black/80">We may modify or discontinue the Site at any time without notice.</p>
                            </motion.div>

                            {/* Section 9 */}
                            <motion.div variants={itemVariants} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">9. Governing Law</h2>
                                <p className="text-brand-black/80">These Terms of Use are governed by the laws of New South Wales, Australia.</p>
                            </motion.div>

                            {/* Section 10 */}
                            <motion.div variants={itemVariants} className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">10. Contact</h2>
                                <p className="text-brand-black/80">Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)<br />Email: hello@brightleasing.com.au<br />Phone: 1300 988 938</p>
                            </motion.div>

                            {/* Section 11 */}
                            <motion.div variants={itemVariants} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">11. Indemnity</h2>
                                <p className="text-brand-black/80">You agree to indemnify Bright Leasing and its officers, employees and agents against all claims, losses, damages, costs (including legal costs) arising out of your breach of these Terms or misuse of our services.</p>
                            </motion.div>

                            {/* Section 12 */}
                            <motion.div variants={itemVariants} className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">12. Prohibited Conduct</h2>
                                <p className="text-brand-black/80">You must not use robots, spiders, data-mining tools or other automated means to access, extract or copy content from our website or services without our prior written consent.</p>
                            </motion.div>

                            {/* Section 13 */}
                            <motion.div variants={itemVariants} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">13. Variation of Terms</h2>
                                <p className="text-brand-black/80">We may change these Terms, Privacy Policy or Terms of Use at any time by publishing a revised version on our Site with an updated effective date. Continued use after the revision indicates your acceptance. We may also notify you via email or site banner.</p>
                            </motion.div>

                            {/* Section 14 */}
                            <motion.div variants={itemVariants} className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">14. Survival Clause</h2>
                                <p className="text-brand-black/80">Clauses such as liability, indemnity, confidentiality, intellectual property, and governing law survive termination or expiry of these agreements.</p>
                            </motion.div>

                            {/* Section 15 */}
                            <motion.div variants={itemVariants} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">15. Notices</h2>
                                <p className="text-brand-black/80">All notices under these agreements must be in writing, and delivered via email (to your registered email), or by post to the address provided. Notices are effective on receipt (or 3 business days if by post).</p>
                            </motion.div>

                            {/* Section 16 */}
                            <motion.div variants={itemVariants} className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">16. Severability</h2>
                                <p className="text-brand-black/80">If a provision is invalid or unenforceable, it must be read down or severed, and the rest of the Terms remain in force.</p>
                            </motion.div>

                            {/* Section 17 */}
                            <motion.div variants={itemVariants} className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">17. Entire Agreement</h2>
                                <p className="text-brand-black/80">These Terms, together with any proposal or documentation expressly referring to them, constitute the entire agreement. In the event of conflict, these Terms prevail unless otherwise stated in the proposal.</p>
                            </motion.div>

                            {/* Section 18 */}
                            <motion.div variants={itemVariants} className="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-brand-black mb-4">18. Data Breach Notification</h2>
                                <p className="text-brand-black/80">If a data breach is likely to result in serious harm, we will notify affected individuals and the OAIC in accordance with the Notifiable Data Breaches scheme under the Privacy Act.</p>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
