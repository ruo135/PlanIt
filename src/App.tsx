import { Suspense } from "react";

import React from "react";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <p>Hi</p>
    </Suspense>
  );
}
