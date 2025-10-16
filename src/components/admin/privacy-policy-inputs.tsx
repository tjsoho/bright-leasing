/* ************************************************************
                        NOTES
************************************************************ */
// Privacy Policy admin inputs component
// Features: Individual input fields for each privacy policy section
// Layout: Matches home inputs styling with sections and fields
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useState, useEffect } from "react";
import { SaveBanner } from "@/components/core/save-banner";
import { EditableElement } from "@/components/core/input";
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
export default function PrivacyPolicyInputs() {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [section1, setSection1] = useState("We may collect personal information including identity, employment, financial, vehicle, communications, analytics and supporting documents.");
    const [section2, setSection2] = useState("We collect information directly from you, your employer, dealers, lenders, insurers and via website cookies.");
    const [section3, setSection3] = useState("To provide novated leasing services, verify identity, manage payroll, communicate and comply with legal obligations.");
    const [section4, setSection4] = useState("Handled in accordance with the Privacy Act and relevant credit reporting rules.");
    const [section5, setSection5] = useState("We may disclose information to lenders, dealers, employers, IT providers and regulators.");
    const [section6, setSection6] = useState("Some service providers may store or access data outside Australia.");
    const [section7, setSection7] = useState("We may send you updates about products, offers and tips. You can opt out at any time.");
    const [section8, setSection8] = useState("We use cookies and similar technologies to operate and improve the site.");
    const [section9, setSection9] = useState("We use reasonable measures to protect information from misuse or unauthorised access.");
    const [section10, setSection10] = useState("You may request access to or correction of your personal information.");
    const [section11, setSection11] = useState("We keep information as needed to meet legal and operational requirements.");
    const [section12, setSection12] = useState("If a data breach is likely to cause serious harm, we will notify affected individuals and the OAIC.");
    const [section13, setSection13] = useState("If you are concerned about privacy, contact us. You may also contact OAIC if unsatisfied.");
    const [section14, setSection14] = useState("We may update this Privacy Policy from time to time.");
    const [section15, setSection15] = useState("Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)\nEmail: privacy@brightleasing.com.au\nPhone: 1300 988 938\nAddress: PO Box 3107, Putney NSW 2112");
    const [section16, setSection16] = useState("You agree to indemnify Bright Leasing and its officers, employees and agents against all claims, losses, damages, costs (including legal costs) arising out of your breach of these Terms or misuse of our services.");
    const [section17, setSection17] = useState("You must not use robots, spiders, data-mining tools or other automated means to access, extract or copy content from our website or services without our prior written consent.");
    const [section18, setSection18] = useState("We may change these Terms, Privacy Policy or Terms of Use at any time by publishing a revised version on our Site with an updated effective date. Continued use after the revision indicates your acceptance. We may also notify you via email or site banner.");
    const [section19, setSection19] = useState("Clauses such as liability, indemnity, confidentiality, intellectual property, and governing law survive termination or expiry of these agreements.");
    const [section20, setSection20] = useState("All notices under these agreements must be in writing, and delivered via email (to your registered email), or by post to the address provided. Notices are effective on receipt (or 3 business days if by post).");
    const [section21, setSection21] = useState("If a provision is invalid or unenforceable, it must be read down or severed, and the rest of the Terms remain in force.");
    const [section22, setSection22] = useState("These Terms, together with any proposal or documentation expressly referring to them, constitute the entire agreement. In the event of conflict, these Terms prevail unless otherwise stated in the proposal.");
    const [section23, setSection23] = useState("If a data breach is likely to result in serious harm, we will notify affected individuals and the OAIC in accordance with the Notifiable Data Breaches scheme under the Privacy Act.");

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');


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
                        setContent("");
                    } else if (error.code === '42P01') {
                        // Table doesn't exist - need to run migration
                        console.error('Privacy policy table does not exist. Please run the database migration.');
                        setContent("");
                    } else {
                        console.error('Error fetching privacy policy:', error);
                        setContent("");
                    }
                } else {
                    setContent(data?.content || "");
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                setContent("");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrivacyPolicy();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus('idle');

        try {
            // Create HTML content from all sections
            const htmlContent = `
        <div class="space-y-8">
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">1. What We Collect</h2>
            <p class="text-brand-black/80">${section1}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">2. How We Collect Information</h2>
            <p class="text-brand-black/80">${section2}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">3. Why We Collect, Use & Disclose</h2>
            <p class="text-brand-black/80">${section3}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">4. Credit-Related Information</h2>
            <p class="text-brand-black/80">${section4}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">5. Disclosures to Third Parties</h2>
            <p class="text-brand-black/80">${section5}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">6. Overseas Disclosures</h2>
            <p class="text-brand-black/80">${section6}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">7. Marketing</h2>
            <p class="text-brand-black/80">${section7}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">8. Cookies & Website Analytics</h2>
            <p class="text-brand-black/80">${section8}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">9. Security</h2>
            <p class="text-brand-black/80">${section9}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">10. Access & Correction</h2>
            <p class="text-brand-black/80">${section10}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">11. Retention</h2>
            <p class="text-brand-black/80">${section11}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">12. Notifiable Data Breaches</h2>
            <p class="text-brand-black/80">${section12}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">13. Complaints</h2>
            <p class="text-brand-black/80">${section13}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">14. Changes to this Policy</h2>
            <p class="text-brand-black/80">${section14}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">15. Contact Us</h2>
            <p class="text-brand-black/80">${section15.replace(/\n/g, '<br />')}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">16. Indemnity</h2>
            <p class="text-brand-black/80">${section16}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">17. Prohibited Conduct</h2>
            <p class="text-brand-black/80">${section17}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">18. Variation of Terms</h2>
            <p class="text-brand-black/80">${section18}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">19. Survival Clause</h2>
            <p class="text-brand-black/80">${section19}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">20. Notices</h2>
            <p class="text-brand-black/80">${section20}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">21. Severability</h2>
            <p class="text-brand-black/80">${section21}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">22. Entire Agreement</h2>
            <p class="text-brand-black/80">${section22}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">23. Data Breach Notification</h2>
            <p class="text-brand-black/80">${section23}</p>
          </div>
        </div>
      `;

            const { error } = await supabase
                .from('privacy_policy')
                .upsert({
                    id: 'privacy-policy-1',
                    content: htmlContent,
                    updated_at: new Date().toISOString()
                });

            if (error) {
                if (error.code === '42P01') {
                    console.error('Privacy policy table does not exist. Please run the database migration first.');
                    setSaveStatus('error');
                } else {
                    console.error('Error saving privacy policy:', error);
                    setSaveStatus('error');
                }
            } else {
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    /* ************************************************************
                            ANIMATION VARIANTS
    ************************************************************ */
    const containerVariants = {
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
        <div>
            <SaveBanner
                pageTitle="Privacy Policy"
                onSave={handleSave}
                isSaving={isSaving}
                saveStatus={saveStatus}
            />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* ***************************************************************
              SECTION 1: WHAT WE COLLECT
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 1 - What We Collect</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection1}
                                    defaultValue={section1}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Information about what personal data we collect
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 2: HOW WE COLLECT INFORMATION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 2 - How We Collect Information</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection2}
                                    defaultValue={section2}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Methods we use to collect personal information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 3: WHY WE COLLECT, USE & DISCLOSE
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 3 - Why We Collect, Use & Disclose</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection3}
                                    defaultValue={section3}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Purposes for collecting and using personal information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 4: CREDIT-RELATED INFORMATION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 4 - Credit-Related Information</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection4}
                                    defaultValue={section4}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we handle credit-related information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 5: DISCLOSURES TO THIRD PARTIES
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 5 - Disclosures to Third Parties</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection5}
                                    defaultValue={section5}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    When and how we share information with third parties
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 6: OVERSEAS DISCLOSURES
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 6 - Overseas Disclosures</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection6}
                                    defaultValue={section6}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Information about overseas data transfers
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 7: MARKETING
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 7 - Marketing</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection7}
                                    defaultValue={section7}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we use information for marketing purposes
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 8: COOKIES & WEBSITE ANALYTICS
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 8 - Cookies & Website Analytics</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection8}
                                    defaultValue={section8}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we use cookies and analytics
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 9: SECURITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 9 - Security</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection9}
                                    defaultValue={section9}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we protect your personal information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 10: ACCESS & CORRECTION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 10 - Access & Correction</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection10}
                                    defaultValue={section10}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Your rights to access and correct your information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 11: RETENTION
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 11 - Retention</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection11}
                                    defaultValue={section11}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How long we keep your information
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 12: NOTIFIABLE DATA BREACHES
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 12 - Notifiable Data Breaches</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection12}
                                    defaultValue={section12}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Our obligations regarding data breaches
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 13: COMPLAINTS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 13 - Complaints</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection13}
                                    defaultValue={section13}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How to make a privacy complaint
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 14: CHANGES TO THIS POLICY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 14 - Changes to this Policy</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection14}
                                    defaultValue={section14}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we notify you of policy changes
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 15: CONTACT US
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 15 - Contact Us</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Contact Information
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection15}
                                    defaultValue={section15}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How to contact us about privacy matters
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 16: INDEMNITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 16 - Indemnity</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection16}
                                    defaultValue={section16}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Indemnity clause for terms and conditions
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 17: PROHIBITED CONDUCT
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 17 - Prohibited Conduct</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection17}
                                    defaultValue={section17}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Prohibited uses of our services
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 18: VARIATION OF TERMS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 18 - Variation of Terms</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection18}
                                    defaultValue={section18}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we can change our terms
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 19: SURVIVAL CLAUSE
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 19 - Survival Clause</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection19}
                                    defaultValue={section19}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Which clauses survive termination
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 20: NOTICES
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 20 - Notices</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection20}
                                    defaultValue={section20}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we send notices to you
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 21: SEVERABILITY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 21 - Severability</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection21}
                                    defaultValue={section21}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    What happens if part of the terms is invalid
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 22: ENTIRE AGREEMENT
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 22 - Entire Agreement</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection22}
                                    defaultValue={section22}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    This agreement constitutes the entire agreement
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 23: DATA BREACH NOTIFICATION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 23 - Data Breach Notification</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection23}
                                    defaultValue={section23}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Our data breach notification obligations
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
// Default export is already declared above
