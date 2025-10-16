/* ************************************************************
                        NOTES
************************************************************ */
// Privacy Policy page with editable content from admin
// Features: Clean layout with company branding and contact info
// Layout: Hero section, content sections, and contact details
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { supabase } from "@/lib/supabase";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface PrivacyPolicyData {
    id: string;
    content: string;
    updated_at: string;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function PrivacyPolicy() {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [privacyData, setPrivacyData] = useState<PrivacyPolicyData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });


    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    useEffect(() => {
        const fetchPrivacyPolicy = async () => {
            try {
                const { data, error } = await supabase
                    .from('privacy_policy')
                    .select('*')
                    .single();

                if (error) {
                    if (error.code === 'PGRST116') {
                        // No rows found - this is expected for new installations
                        console.log('No privacy policy found, using default content');
                        setPrivacyData(null);
                    } else if (error.code === '42P01') {
                        // Table doesn't exist - need to run migration
                        console.error('Privacy policy table does not exist. Please run the database migration.');
                        setPrivacyData(null);
                    } else {
                        console.error('Error fetching privacy policy:', error);
                        setPrivacyData(null);
                    }
                } else {
                    setPrivacyData(data);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                setPrivacyData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrivacyPolicy();
    }, []);

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1] as const,
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
    return (
        <div className="min-h-screen bg-white">
            {/* ************************************************************
          HERO SECTION
      ************************************************************ */}
            <section className="bg-gradient-to-br from-brand-cream/30 via-white to-brand-yellow/10 py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="text-center"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-6"
                        >
                            Privacy Policy
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-brand-black/70 mb-8"
                        >
                            Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)
                        </motion.p>
                        <motion.div
                            variants={itemVariants}
                            className="w-24 h-1 bg-brand-yellow mx-auto rounded-full"
                        />
                    </motion.div>
                </div>
            </section>

            {/* ************************************************************
          CONTENT SECTION
      ************************************************************ */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="text-brand-black/70 text-lg">Loading privacy policy...</div>
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: privacyData?.content || `
                                    <div class="space-y-8">
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">1. What We Collect</h2>
                                            <p class="text-brand-black/80">We may collect personal information including identity, employment, financial, vehicle, communications, analytics and supporting documents.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">2. How We Collect Information</h2>
                                            <p class="text-brand-black/80">We collect information directly from you, your employer, dealers, lenders, insurers and via website cookies.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">3. Why We Collect, Use & Disclose</h2>
                                            <p class="text-brand-black/80">To provide novated leasing services, verify identity, manage payroll, communicate and comply with legal obligations.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">4. Credit-Related Information</h2>
                                            <p class="text-brand-black/80">Handled in accordance with the Privacy Act and relevant credit reporting rules.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">5. Disclosures to Third Parties</h2>
                                            <p class="text-brand-black/80">We may disclose information to lenders, dealers, employers, IT providers and regulators.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">6. Overseas Disclosures</h2>
                                            <p class="text-brand-black/80">Some service providers may store or access data outside Australia.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">7. Marketing</h2>
                                            <p class="text-brand-black/80">We may send you updates about products, offers and tips. You can opt out at any time.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">8. Cookies & Website Analytics</h2>
                                            <p class="text-brand-black/80">We use cookies and similar technologies to operate and improve the site.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">9. Security</h2>
                                            <p class="text-brand-black/80">We use reasonable measures to protect information from misuse or unauthorised access.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">10. Access & Correction</h2>
                                            <p class="text-brand-black/80">You may request access to or correction of your personal information.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">11. Retention</h2>
                                            <p class="text-brand-black/80">We keep information as needed to meet legal and operational requirements.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">12. Notifiable Data Breaches</h2>
                                            <p class="text-brand-black/80">If a data breach is likely to cause serious harm, we will notify affected individuals and the OAIC.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">13. Complaints</h2>
                                            <p class="text-brand-black/80">If you are concerned about privacy, contact us. You may also contact OAIC if unsatisfied.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">14. Changes to this Policy</h2>
                                            <p class="text-brand-black/80">We may update this Privacy Policy from time to time.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">15. Contact Us</h2>
                                            <p class="text-brand-black/80">Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)<br />
                                                Email: privacy@brightleasing.com.au<br />
                                                Phone: 1300 988 938<br />
                                                Address: PO Box 3107, Putney NSW 2112</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">16. Indemnity</h2>
                                            <p class="text-brand-black/80">You agree to indemnify Bright Leasing and its officers, employees and agents against all claims, losses, damages, costs (including legal costs) arising out of your breach of these Terms or misuse of our services.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">17. Prohibited Conduct</h2>
                                            <p class="text-brand-black/80">You must not use robots, spiders, data-mining tools or other automated means to access, extract or copy content from our website or services without our prior written consent.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">18. Variation of Terms</h2>
                                            <p class="text-brand-black/80">We may change these Terms, Privacy Policy or Terms of Use at any time by publishing a revised version on our Site with an updated effective date. Continued use after the revision indicates your acceptance. We may also notify you via email or site banner.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">19. Survival Clause</h2>
                                            <p class="text-brand-black/80">Clauses such as liability, indemnity, confidentiality, intellectual property, and governing law survive termination or expiry of these agreements.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">20. Notices</h2>
                                            <p class="text-brand-black/80">All notices under these agreements must be in writing, and delivered via email (to your registered email), or by post to the address provided. Notices are effective on receipt (or 3 business days if by post).</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">21. Severability</h2>
                                            <p class="text-brand-black/80">If a provision is invalid or unenforceable, it must be read down or severed, and the rest of the Terms remain in force.</p>
                                        </div>
                                        <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">22. Entire Agreement</h2>
                                            <p class="text-brand-black/80">These Terms, together with any proposal or documentation expressly referring to them, constitute the entire agreement. In the event of conflict, these Terms prevail unless otherwise stated in the proposal.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">23. Data Breach Notification</h2>
                                            <p class="text-brand-black/80">If a data breach is likely to result in serious harm, we will notify affected individuals and the OAIC in accordance with the Notifiable Data Breaches scheme under the Privacy Act.</p>
                                        </div>
                                        <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8 mt-8">
                                            <h2 class="text-2xl font-bold text-brand-black mb-4">Contact Information</h2>
                                            <p class="text-brand-black/80">
                                                Brightwork Group Pty Ltd trading as Bright Leasing<br />
                                                ABN 20 688 482 975<br />
                                                Phone: 1300 988 938<br />
                                                Address: PO Box 3107, Putney NSW 2112
                                            </p>
                                        </div>
                                    </div>
                                `
                            }}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
// Default export is already declared above
