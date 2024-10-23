import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <p>Sidebar</p>
      {children}
    </div>
  );
};

export default AdminLayout;
