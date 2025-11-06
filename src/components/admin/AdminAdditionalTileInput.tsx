import { AdditionalTile } from "@/app/_config";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import AdminTileInput, { AdminTileInputProps } from "./AdminTileInput";

interface Props {
  onChange: (tiles: AdditionalTile[]) => void;
  type?: AdminTileInputProps["type"];
}

export default function AdminAditionalTileInput({
  onChange,
  type = "default",
}: Props) {
  const [tiles, setTiles] = useState<AdditionalTile[]>([]);

  const handleAddTile = () => {
    setTiles([
      ...tiles,
      {
        id: `section6-tile-${Date.now()}`,
        title: "",
        titleBold: false,
        description: "",
        descriptionBold: false,
        backgroundColor: "",
        image: "",
      },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof AdditionalTile,
    value: string | boolean,
  ) => {
    const updatedTiles = [...tiles];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updatedTiles[index] as any)[field] = value;
    setTiles(updatedTiles);

    onChange(updatedTiles);
  };

  const handleRemove = (index: number) => {
    const updatedTiles = [...tiles];
    updatedTiles.splice(index, 1);
    setTiles(updatedTiles);

    onChange(updatedTiles);
  };

  return (
    <>
      {tiles.map((tile, index) => (
        <AdminTileInput
          key={index}
          label={`Tile ${index + 1}`}
          title={tile.title}
          titleBold={tile.titleBold}
          description={tile.description}
          descriptionBold={tile.descriptionBold}
          image={tile.image ?? "/placeholder.jpg"}
          onDescriptionBoldChange={(value) => {
            handleChange(index, "descriptionBold", value);
          }}
          onDescriptionChange={(value) => {
            handleChange(index, "description", value);
          }}
          onTitleChange={(value) => {
            handleChange(index, "title", value);
          }}
          onImageChange={(value) => {
            handleChange(index, "image", value);
          }}
          onTitleBoldChange={(value) => {
            handleChange(index, "titleBold", value);
          }}
          onRemove={() => {
            handleRemove(index);
          }}
          type={type}
        />
      ))}

      <div className="mt-4">
        <Button onClick={handleAddTile} variant="outline">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Additional Tile
        </Button>
      </div>
    </>
  );
}
