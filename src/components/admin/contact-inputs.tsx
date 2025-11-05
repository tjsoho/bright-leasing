"use client";

import { ContactPageProps } from "@/app/_config";
import { SaveBanner } from "../core/save-banner";
import usePageDataManager from "@/utils/hooks/usePageDataManager";
import AdminFormSection from "./AdminFormSection";
import AdminImageInput from "./AdminImageInput";
import AdminTextInput from "./AdminTextInput";

interface Props {
  data: ContactPageProps;
}

export default function ContactAdminInputs({ data }: Props) {
  const { isSaving, getData, handleChange, handleSave } =
    usePageDataManager(data);

  return (
    <div>
      <SaveBanner
        pageTitle="Contact Page"
        onSave={handleSave}
        isSaving={isSaving}
      />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdminFormSection title="Hero Section">
            <div className="space-y-6">
              <AdminTextInput
                label="Hero Subtitle"
                value={getData("content.heroSubtitle") ?? ""}
                bold={getData("content.heroSubtitleBold") ?? false}
                onChange={(value) =>
                  handleChange("content.heroSubtitle", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.heroSubtitleBold", value)
                }
              />

              <AdminTextInput
                label="Hero Title"
                value={getData("content.heroTitle") ?? ""}
                bold={getData("content.heroTitleBold") ?? false}
                onChange={(value) => handleChange("content.heroTitle", value)}
                onBoldChange={(value) =>
                  handleChange("content.heroTitleBold", value)
                }
              />

              <AdminTextInput
                label="Hero Description"
                value={getData("content.heroDescription") ?? ""}
                bold={getData("content.heroDescriptionBold") ?? false}
                onChange={(value) =>
                  handleChange("content.heroDescription", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.heroDescriptionBold", value)
                }
              />
            </div>
          </AdminFormSection>

          <AdminFormSection title="Contact Information Section">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AdminTextInput
                  label="Contact Title"
                  value={getData("content.contactTitle") ?? ""}
                  bold={getData("content.contactTitleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.contactTitle", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.contactTitleBold", value)
                  }
                />

                <AdminTextInput
                  label="Contact Description"
                  value={getData("content.contactDescription") ?? ""}
                  bold={getData("content.contactDescriptionBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.contactDescription", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.contactDescriptionBold", value)
                  }
                />
              </div>

              <AdminImageInput
                label="Contact Image"
                value={getData("content.contactImage") ?? ""}
                onChange={(value) =>
                  handleChange("content.contactImage", value)
                }
              />
            </div>
          </AdminFormSection>

          <AdminFormSection title="Success Message Modal">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AdminTextInput
                  label="Success Title"
                  value={getData("content.successTitle") ?? ""}
                  bold={getData("content.successTitleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.successTitle", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.successTitleBold", value)
                  }
                />

                <AdminTextInput
                  label="Success Message"
                  value={getData("content.successMessage") ?? ""}
                  bold={getData("content.successMessageBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.successMessage", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.successMessageBold", value)
                  }
                />
              </div>

              <div className="space-y-6">
                <AdminImageInput
                  label="Success Image"
                  value={getData("content.successImage") ?? ""}
                  onChange={(value) =>
                    handleChange("content.successImage", value)
                  }
                />

                <AdminImageInput
                  label="Success Logo"
                  value={getData("content.successLogo") ?? ""}
                  onChange={(value) =>
                    handleChange("content.successLogo", value)
                  }
                />
              </div>
            </div>
          </AdminFormSection>
        </div>
      </div>
    </div>
  );
}
