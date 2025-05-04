type SaveAreaClickHandler = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  areaRef: React.RefObject<HTMLDivElement>,
  callback: () => void
) => void;

export const handleClickOutsideSaveArea: SaveAreaClickHandler = (event, areaRef, callback) => {
  if (areaRef.current && !areaRef.current.contains(event.target as Node)) {
    callback();
  }
};