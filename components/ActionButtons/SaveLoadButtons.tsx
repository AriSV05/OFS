import React from "react";

export const Save = ({
  setSaveOpen,
}: {
  setSaveOpen: (open: boolean) => void;
}) => {
  const openSave = () => {
    setSaveOpen(true);
  };
  return (
    <>
      <button className="button" onClick={openSave}>
        Save
      </button>
    </>
  );
};

export const Load = ({
  setLoadOpen,
}: {
  setLoadOpen: (open: boolean) => void;
}) => {
  const openLoad = () => {
    setLoadOpen(true);
  };
  return (
    <>
      <button className="button" onClick={openLoad}>
        Load
      </button>
    </>
  );
};
