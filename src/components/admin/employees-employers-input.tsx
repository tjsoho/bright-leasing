"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { SaveBanner } from "../core/save-banner";
import usePageDataManager from "@/utils/hooks/usePageDataManager";
import AdminFormSection from "./AdminFormSection";
import AdminImageInput from "./AdminImageInput";
import AdminTextInput from "./AdminTextInput";
import AdminTileInput from "./AdminTileInput";
import { DeepKeys } from "@/types/deep-object";

interface Props {
  data: EmployersEmployeesPageProps;
}

export default function EmployeesEmployersInput({ data }: Props) {
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
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.heroTitle") ?? ""}
                  bold={getData("content.heroTitleBold") ?? false}
                  onChange={(value) => handleChange("content.heroTitle", value)}
                  onBoldChange={(value) =>
                    handleChange("content.heroTitleBold", value)
                  }
                />
                <AdminTextInput
                  label="Paragraph"
                  value={getData("content.heroParagraph") ?? ""}
                  bold={getData("content.heroParagraphBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.heroParagraph", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.heroParagraphBold", value)
                  }
                />
              </div>

              <AdminImageInput
                label="Hero Image"
                value={getData("content.heroImage") ?? ""}
                onChange={(value) => handleChange("content.heroImage", value)}
              />
            </div>
          </AdminFormSection>

          {/* Section 2 */}
          <AdminFormSection title="Section 2 - Company Values">
            <div className="space-y-6">
              <AdminTextInput
                label="Title"
                value={getData("content.section2title") ?? ""}
                bold={getData("content.section2titleBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section2title", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section2titleBold", value)
                }
              />

              <AdminTextInput
                label="Paragraph"
                value={getData("content.section2paragraph") ?? ""}
                bold={getData("content.section2paragraphBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section2paragraph", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section2paragraphBold", value)
                }
              />

              {Array.from({ length: 4 }).map((_, index) => (
                <AdminTileInput
                  key={index}
                  label={`Tile ${index + 1}`}
                  title={
                    getData(
                      `content.section2tile${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  titleBold={
                    getData(
                      `content.section2tile${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? false
                  }
                  description={
                    getData(
                      `content.section2tile${index + 1}description` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  descriptionBold={
                    getData(
                      `content.section2tile${index + 1}descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? false
                  }
                  image={
                    getData(
                      `content.section2tile${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  onTitleChange={(value) =>
                    handleChange(
                      `content.section2tile${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onTitleBoldChange={(value) =>
                    handleChange(
                      `content.section2tile${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onDescriptionChange={(value) =>
                    handleChange(
                      `content.section2tile${index + 1}description` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onDescriptionBoldChange={(value) =>
                    handleChange(
                      `content.section2tile${index + 1}descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onImageChange={(value) =>
                    handleChange(
                      `content.section2tile${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                />
              ))}
            </div>
          </AdminFormSection>

          {/* Section 3 - Tip Banner */}
          <AdminFormSection title="Section 3 - Tip Banner">
            <div className="grid lg:grid-cols-2 gap-6">
              <AdminImageInput
                label="Icon"
                value={getData("content.section3icon") ?? ""}
                onChange={(value) =>
                  handleChange("content.section3icon", value)
                }
              />

              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.section3title") ?? ""}
                  bold={getData("content.section3titleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section3title", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section3titleBold", value)
                  }
                />
                <AdminTextInput
                  label="Paragraph"
                  value={getData("content.section3paragraph") ?? ""}
                  bold={getData("content.section3paragraphBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section3paragraph", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section3paragraphBold", value)
                  }
                />
              </div>
            </div>
          </AdminFormSection>

          {/* Section 4 - How it Works */}
          <AdminFormSection title="Section 4 - How it Works">
            <div className="space-y-6">
              <AdminTextInput
                label="Title"
                value={getData("content.section4title") ?? ""}
                bold={getData("content.section4titleBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section4title", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section4titleBold", value)
                }
              />

              <AdminTextInput
                label="Paragraph"
                value={getData("content.section4paragraph") ?? ""}
                bold={getData("content.section4paragraphBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section4paragraph", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section4paragraphBold", value)
                }
              />

              {data.slug === "employers" && (
                <>
                  <div className="grid grid-cols-2">
                    <AdminImageInput
                      label="Tab 1 Icon"
                      value={getData("content.section4tabs.tab1Icon") ?? ""}
                      onChange={(value) =>
                        handleChange("content.section4tabs.tab1Icon", value)
                      }
                    />
                    <AdminTextInput
                      label="Tab 1 Title"
                      value={getData("content.section4tabs.tab1") ?? ""}
                      onChange={(value) =>
                        handleChange("content.section4tabs.tab1", value)
                      }
                    />
                  </div>

                  {Array.from({ length: 5 }).map((_, index) => (
                    <AdminTileInput
                      key={index}
                      label={`Tab 1 - Content ${index + 1}`}
                      title={
                        getData(
                          `content.section4tab1items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      titleBold={
                        getData(
                          `content.section4tab1items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      description={
                        getData(
                          `content.section4tab1items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      descriptionBold={
                        getData(
                          `content.section4tab1items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      image={
                        getData(
                          `content.section4tab1items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      onTitleChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onTitleBoldChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionBoldChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onImageChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      hint={
                        index === 1
                          ? "This Content Image will be use as background on center tile"
                          : ""
                      }
                    />
                  ))}

                  <div className="grid grid-cols-2">
                    <AdminImageInput
                      label="Tab 2 Icon"
                      value={getData("content.section4tabs.tab2Icon") ?? ""}
                      onChange={(value) =>
                        handleChange("content.section4tabs.tab2Icon", value)
                      }
                    />
                    <AdminTextInput
                      label="Tab 2 Title"
                      value={getData("content.section4tabs.tab2") ?? ""}
                      onChange={(value) =>
                        handleChange("content.section4tabs.tab2", value)
                      }
                    />
                  </div>

                  {Array.from({ length: 5 }).map((_, index) => (
                    <AdminTileInput
                      key={index}
                      label={`Tab 2 - Content ${index + 1}`}
                      title={
                        getData(
                          `content.section4tab2items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      titleBold={
                        getData(
                          `content.section4tab2items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      description={
                        getData(
                          `content.section4tab2items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      descriptionBold={
                        getData(
                          `content.section4tab2items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      image={
                        getData(
                          `content.section4tab2items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      onTitleChange={(value) =>
                        handleChange(
                          `content.section4tab2items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onTitleBoldChange={(value) =>
                        handleChange(
                          `content.section4tab2items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionChange={(value) =>
                        handleChange(
                          `content.section4tab2items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionBoldChange={(value) =>
                        handleChange(
                          `content.section4tab2items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onImageChange={(value) =>
                        handleChange(
                          `content.section4tab2items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      hint={
                        index === 1
                          ? "This Content Image will be use as background on center tile"
                          : ""
                      }
                    />
                  ))}
                </>
              )}

              {data.slug === "employees" && (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <AdminTileInput
                      key={index}
                      label={`Content ${index + 1}`}
                      title={
                        getData(
                          `content.section4tab1items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      titleBold={
                        getData(
                          `content.section4tab1items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      description={
                        getData(
                          `content.section4tab1items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      descriptionBold={
                        getData(
                          `content.section4tab1items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      image={
                        getData(
                          `content.section4tab1items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      onTitleChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onTitleBoldChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionBoldChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onImageChange={(value) =>
                        handleChange(
                          `content.section4tab1items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      hint={
                        index === 1
                          ? "This Content Image will be use as background on center tile"
                          : ""
                      }
                    />
                  ))}
                </>
              )}
            </div>
          </AdminFormSection>

          {/* Section 5 */}
          <AdminFormSection title="Section 5 - Benefits">
            <div className="space-y-6">
              <AdminTextInput
                label="Title"
                value={getData("content.section5title") ?? ""}
                bold={getData("content.section5titleBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section5title", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section5titleBold", value)
                }
              />

              <AdminTextInput
                label="Paragraph"
                value={getData("content.section5paragraph") ?? ""}
                bold={getData("content.section5paragraphBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section5paragraph", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section5paragraphBold", value)
                }
              />

              {Array.from({ length: 5 }).map((_, index) => (
                <AdminTileInput
                  key={index}
                  label={`Tile ${index + 1}`}
                  title={
                    getData(
                      `content.section5tiles.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  titleBold={
                    getData(
                      `content.section5tiles.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? false
                  }
                  description={
                    getData(
                      `content.section5tiles.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  descriptionBold={
                    getData(
                      `content.section5tiles.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? false
                  }
                  image={
                    getData(
                      `content.section5tiles.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  onTitleChange={(value) =>
                    handleChange(
                      `content.section5tiles.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onTitleBoldChange={(value) =>
                    handleChange(
                      `content.section5tiles.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onDescriptionChange={(value) =>
                    handleChange(
                      `content.section5tiles.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onDescriptionBoldChange={(value) =>
                    handleChange(
                      `content.section5tiles.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onImageChange={(value) =>
                    handleChange(
                      `content.section5tiles.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                />
              ))}
            </div>
          </AdminFormSection>

          {/* Section 6 - Instant Saving Check */}
          <AdminFormSection title="Section 6 - Instant Saving Check">
            <div className="space-y-6">
              <AdminTextInput
                label="Title"
                value={getData("content.section6title") ?? ""}
                bold={getData("content.section6titleBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section6title", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section6titleBold", value)
                }
              />

              <AdminTextInput
                label="Paragraph"
                value={getData("content.section6paragraph") ?? ""}
                bold={getData("content.section6paragraphBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section6paragraph", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section6paragraphBold", value)
                }
              />
            </div>
          </AdminFormSection>

          {/* Section 7 - Promotional Banner */}
          <AdminFormSection title="Section 7 - Promotional Banner">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.section7title") ?? ""}
                  bold={getData("content.section7titleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section7title", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section7titleBold", value)
                  }
                />
                <AdminTextInput
                  label="Description"
                  value={getData("content.section7description") ?? ""}
                  bold={getData("content.section7descriptionBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section7description", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section7descriptionBold", value)
                  }
                />
                <AdminTextInput
                  label="Button Text"
                  value={getData("content.section7buttonText") ?? ""}
                  bold={false}
                  onChange={(value) =>
                    handleChange("content.section7buttonText", value)
                  }
                />
              </div>

              <AdminImageInput
                label="Image"
                value={getData("content.section7image") ?? ""}
                onChange={(value) =>
                  handleChange("content.section7image", value)
                }
              />
            </div>
          </AdminFormSection>

          {/* Section 8 - FAQ */}
          <AdminFormSection title="Section 8 - FAQ">
            <div className="space-y-6">
              <AdminTextInput
                label="Title"
                value={getData("content.section8title") ?? ""}
                bold={getData("content.section8titleBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section8title", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section8titleBold", value)
                }
              />

              {Array.from({ length: 4 }).map((_, index) => (
                <AdminTileInput
                  key={index}
                  label={`Tile ${index + 1}`}
                  title={
                    getData(
                      `content.section8faq${index + 1}question` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  titleBold={
                    getData(
                      `content.section8faq${index + 1}questionBold` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? false
                  }
                  description={
                    getData(
                      `content.section8faq${index + 1}answer` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  descriptionBold={
                    getData(
                      `content.section5faq${index}answerBold` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? false
                  }
                  onTitleChange={(value) =>
                    handleChange(
                      `content.section5faq${index}question` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onTitleBoldChange={(value) =>
                    handleChange(
                      `content.section5faq${index}questionBold` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onDescriptionChange={(value) =>
                    handleChange(
                      `content.section5faq${index}answer` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onDescriptionBoldChange={(value) =>
                    handleChange(
                      `content.section5faq${index}answerBold` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                />
              ))}
            </div>
          </AdminFormSection>
        </div>
      </div>
    </div>
  );
}
