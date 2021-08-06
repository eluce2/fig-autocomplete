const completionSpec: Fig.Spec = {
  name: "fmdatamigration",
  description: "",
  options: [
    {
      displayName: "Source File",
      description: "Source filename and path.",
      name: "-src_path",
      required: true,
      args: {
        isOptional: false,
        name: "PATH",
        template: "filepaths",
      },
      priority: 81,
    },
    {
      displayName: "Clone Path",
      description: "Clone filename and path.",
      name: "-clone_path",
      required: true,
      priority: 80,
    },
    {
      name: "-src_account",
      displayName: "Source Account Name",
      description: "Account name used for opening the source file.",
      args: {
        isOptional: false,
        name: "Account Name",
        default: "Admin",
        description: "Account name used for opening the source file.",
      },
    },
    {
      name: "-src_pwd",
      displayName: "Source Password",
      description: "Password for accessing the source file.",
      args: {
        isOptional: false,
        name: "Password",
        description: "Password for accessing the source file.",
      },
    },
    {
      name: "-src_key",
      displayName: "Source Encryption Key",
      description: "Encryption password for decrypting the source file.",
      args: {
        isOptional: false,
        name: "Encryption Key",
        description: "Encryption password for decrypting the source file.",
      },
    },
    {
      name: "-clone_account",
      displayName: "Clone Account Name",
      description: "Account name for accessing the clone.",
      args: {
        isOptional: false,
        name: "Account Name",
        default: "Admin",
        description: "Account name for accessing the clone.",
      },
    },
    {
      name: "-clone_pwd",
      displayName: "Clone Password",
      description: "Password for accessing the clone.",
      args: {
        isOptional: false,
        name: "Password",
        description: "Password for accessing the clone.",
      },
    },
    {
      name: "-clone_key",
      displayName: "Clone Encryption Key",
      description: "Encryption password for decrypting the clone.",
      args: {
        isOptional: false,
        name: "Encryption Key",
        description: "Encryption password for decrypting the clone.",
      },
    },
    {
      name: "-target_path",
      displayName: "",
      description:
        "Target filename and path. The default target file, source filename migrated.fmp12, is located in the same folder as the source file.",
      args: {
        isOptional: false,
        name: "",
        template: "filepaths",
        description:
          "Target filename and path. The default target file, source filename migrated.fmp12, is located in the same folder as the source file.",
      },
    },
    {
      name: "-force",
      displayName: "",
      description:
        "Overwrites an existing target file. If you have an existing target file, you must use a different name for the new target file, or use -force to overwrite the existing file.",
      args: {
        isOptional: false,
        name: "",
        description:
          "Overwrites an existing target file. If you have an existing target file, you must use a different name for the new target file, or use -force to overwrite the existing file.",
      },
    },
    {
      name: "-ignore_valuelists",
      displayName: "",
      description:
        "Uses custom value lists from the clone instead of the source file.",
      args: {
        isOptional: false,
        name: "",
        description:
          "Uses custom value lists from the clone instead of the source file.",
      },
    },
    {
      name: "-ignore_accounts",
      displayName: "",
      description:
        "Uses the account names, passwords, and the encryption password from the clone instead of the source file.",
      args: {
        isOptional: false,
        name: "",
        description:
          "Uses the account names, passwords, and the encryption password from the clone instead of the source file.",
      },
    },
    {
      name: "-ignore_fonts",
      displayName: "",
      description: "Doesn't check the font mapping for field contents.",
      args: {
        isOptional: false,
        name: "",
        description: "Doesn't check the font mapping for field contents.",
      },
    },
    {
      name: "-v",
      displayName: "",
      description:
        "For accounts with the Full Access privilege set, provides a detailed report about the data migration process. For accounts with the fmmigration extended privilege, in both normal and verbose modes, the tool provides only a brief report without displaying any information about the schema.",
      args: {
        isOptional: false,
        name: "",
        description:
          "For accounts with the Full Access privilege set, provides a detailed report about the data migration process. For accounts with the fmmigration extended privilege, in both normal and verbose modes, the tool provides only a brief report without displaying any information about the schema.",
      },
    },
    {
      name: "-q",
      displayName: "",
      description: "Doesn't provide a report.",
      args: {
        isOptional: false,
        name: "",
        description: "Doesn't provide a report.",
      },
    },
    {
      name: "-rebuildindexes",
      displayName: "",
      description:
        "Rebuilds indexes from scratch. (Introduced in version 19.1.3)",
      args: {
        isOptional: false,
        name: "",
        description:
          "Rebuilds indexes from scratch. (Introduced in version 19.1.3)",
      },
    },
    {
      name: "-reevaluate",
      displayName: "",
      description:
        "All 'stored' calculations are re-evaluated. (Introduced in version 19.1.3)",
      args: {
        isOptional: false,
        name: "",
        description:
          "All 'stored' calculations are re-evaluated. (Introduced in version 19.1.3)",
      },
    },
  ],
};

export default completionSpec;
