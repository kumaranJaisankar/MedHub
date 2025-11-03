import { getToken } from "@auth/core/jwt";
import React from "react";
import path from "node:path";
import { renderToString } from "react-dom/server";
import routes from "../../../routes";
import { serializeError } from "serialize-error";
import cleanStack from "clean-stack";

function serializeClean(err) {
  // if we want to clean this more, maybe we should look at the file where it
  // is imported and above.
  err.stack = cleanStack(err.stack, {
    pathFilter: (path) => {
      // Filter out paths that are not relevant to the error
      return (
        !path.includes("node_modules") &&
        !path.includes("dist") &&
        !path.includes("__create")
      );
    },
  });

  return serializeError(err);
}
// For dev-time safety we avoid server-rendering entire app pages here because
// some components may perform streaming or environment-specific side effects
// that can close the underlying stream unexpectedly. Instead return metadata
// about route files so the dev SSR test can still inspect routes without
// performing real rendering.
export async function GET(request) {
  const results = routes.map((r) => ({ route: r.file, path: r.path }));
  return Response.json({ results });
}
