import PhotoCard from "@/components/PhotoCard";

export default function PhotoGrid({
  children,
  pictureFolders,
}: {
  children: React.ReactNode;
  pictureFolders: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pictureFolders.map((pictureFolder) => (
        <PhotoCard key={pictureFolder} pictureFolder={pictureFolder}>
          {children}
        </PhotoCard>
      ))}
    </div>
  );
}
