const commands: Fig.Suggestion[] = [
  { name: "autorestart", displayName: "auto restart" },
  { name: "backup" },
  { name: "certificate" },
  { name: "clearkey" },
  { name: "close" },
  { name: "disable" },
  { name: "disconnect" },
  { name: "enable" },
  { name: "get" },
  { name: "list" },
  { name: "open" },
  { name: "pause" },
  { name: "remove" },
  { name: "restart" },
  { name: "resume" },
  { name: "run" },
  { name: "send" },
  { name: "set" },
  { name: "start" },
  { name: "status" },
  { name: "stop" },
  { name: "verify" },
  { name: "wpe" },
  { name: "resetpw", displayName: "reset password" },
];
const messageOpt: Fig.Option = {
  name: ["-m", "--message"],
  insertValue: "-m '{cursor}'",
  args: [
    {
      name: "message",
      description: "Specifies a text message to send.",
      isOptional: false,
    },
  ],
};
const processTypes: Fig.Suggestion[] = [
  { name: "adminserver", displayName: "Admin Server" },
  { name: "server", displayName: "Database Server" },
  { name: "fmse", description: "FileMaker Script Engine process" },
  { name: "fmsib", description: "Server Progressive Backup process" },
  { name: "xdbc", description: "ODBC/JDBC listener process" },
  { name: "wpe", description: "all Web Publishing processes" },
  { name: "fmdapi", description: "all FileMaker Data API processes" },
  { name: "http", description: "Web Server process" },
];
const yesOpt: Fig.Option = {
  name: ["-y", "--yes"],
  description: "Automatically answer yes to all command prompts.",
};
const gracetimeOpt: Fig.Option = {
  name: ["-t", "--gracetime"],
  description: "How long to wait before forcing disconnection.",
  args: {
    name: "seconds",
    description: "How long to wait before forcing disconnection.",
    default: "90",
  },
};
const forceOpt: Fig.Option = {
  name: ["-f", "--force"],
  description: "Expedites the command, overrides -t option.",
};
const globalOpts: Fig.Option[] = [
  yesOpt,
  {
    name: ["-p", "--password"],
    insertValue: "-p '{cursor}'",
    description:
      "Specify the password to use to authenticate the server. See OPEN command for information about password parameters for opening encrypted databases.",
    args: {
      name: "password",
      isOptional: false,
    },
  },
  {
    name: ["-u", "--username"],
    insertValue: "-u '{cursor}'",
    description:
      "Specify username and/or domain name to use to connect to FileMaker Server.",
    args: {
      name: "username",
      isOptional: false,
    },
  },
  {
    name: ["-w", "--wait"],
    description: "Specify time in seconds for command to time out.",
    priority: 25,
    args: {
      name: "seconds",
      isOptional: false,
    },
  },
];
export const completion: Fig.Spec = {
  name: "fmsadmin",
  description: "",
  subcommands: [
    {
      name: "help",
      description: "See a list of available commands",
      args: {
        name: "COMMAND",
        description: "Display the help for a specific command.",
        suggestions: commands,
        isOptional: true,
      },
    },
    {
      name: "autorestart",
      description: "Get or set auto-restart for the Admin Server or FMSE",
      options: [...globalOpts],
      args: [
        {
          name: "Type",
          suggestions: ["ADMINSERVER", "FMSE"],
          isOptional: false,
        },
        {
          name: "Flag",
          suggestions: ["ON", "OFF"],
          isOptional: false,
        },
      ],
    },
    {
      name: "backup",
      description: "Back up databases",
      args: [
        {
          name: "FILE / PATH",
          variadic: true,
        },
      ],
      options: [
        ...globalOpts,
        {
          name: ["-d", "--dest"],
          description:
            "Overrides the default backup folder destination by backing up the databases to the specified path.",
          args: {
            name: "PATH",
            description: "The path to a folder must end a slash",
          },
        },
        {
          name: ["-k", "--keep"],
          description: " Specify count of backups to keep (default is 1).",
          args: {
            name: "count",
            default: "1",
          },
        },
        {
          name: ["-n", "--clone"],
          description: "Clone each backup file after optional verify",
        },
        {
          name: ["-x", "--verify"],
          description: "Verify integrity of each backup file",
        },
      ],
    },
    {
      name: "certificate",
      description: "Manage SSL certificates",
      args: [
        {
          name: "operation",
          suggestions: ["CREATE", "IMPORT", "DELETE"],
        },
        {
          name: "name",
        },
        {
          name: "file",
          isOptional: true,
        },
      ],
      options: [
        ...globalOpts,
        {
          name: "--keyfile",
          description:
            "The private key file which is associated with the signed certificate file.",
          args: {
            name: "KEYFILE",
            template: "filepaths",
            isOptional: false,
          },
        },
        {
          name: "--keyfilepass",
          description:
            "Specifies the encryption password used to encrypt and decrypt the private key file.",
          args: {
            name: "secret",
          },
        },
      ],
    },
    {
      name: "clearkey",
      description: "Removes saved database encryption passwords",
      args: [
        {
          name: "FILE",
          isOptional: true,
          variadic: true,
        },
      ],
      options: [...globalOpts],
    },
    {
      name: "close",
      description: "Close databases",
      isDangerous: true,
      args: [
        {
          name: "FILE or PATH",
          variadic: true,
          isOptional: true,
        },
      ],
      options: [...globalOpts, messageOpt, gracetimeOpt, forceOpt],
    },
    {
      name: "disable",
      description: "Disable schedule or detailed statistics logging",
      subcommands: [
        {
          name: "schedule",
          args: [
            {
              name: "SCHEDULE_NUMBER",
              description: "The ID of the schedule to disable",
              isOptional: false,
            },
          ],
        },
      ],
      args: [
        {
          name: "TYPE",
          suggestions: ["clientstats", "serverstats", "topcallstats"],
        },
      ],
      options: [...globalOpts],
    },
    {
      name: "disconnect",
      insertValue: "disconnect client",
      description: "Disconnect a client",
      isDangerous: true,
      args: [
        {
          name: "CLIENT_NUMBER",
          description: "Client ID to disconnect. If blank, all clients",
          isOptional: true,
        },
      ],
      options: [yesOpt, messageOpt, forceOpt],
    },
    {
      name: "enable",
      description: "Enable schedules or detailed statistics logging",
      subcommands: [
        {
          name: "SCHEDULE",
          args: [
            {
              name: "SCHEDULE_NUMBER",
              description: "The ID of the schedule to disable",
              isOptional: false,
            },
          ],
        },
      ],
      args: [
        {
          name: "TYPE",
          suggestions: ["clientstats", "serverstats", "topcallstats"],
        },
      ],
      options: [...globalOpts],
    },
    {
      name: "get",
      description: "Retrieve server or CWP configuration settings",
      subcommands: [
        {
          name: "backuptime",
          displayName: "Backup Time",
          description: "Get the start time of a specified backup schedule",
          args: [
            {
              name: "ID",
              description: "The ID of a backup. If blank, will return all.",
              isOptional: true,
            },
          ],
        },
        {
          name: "serverconfig",
          displayName: "Server Config",
          description: "Retrieve the server configuration settings.",
          args: [
            {
              name: "NAME",
              variadic: true,
              isOptional: false,
              suggestions: [
                {
                  name: "backupinterval",
                  description:
                    "How frequently FileMaker Server runs progressive backup, in minutes.",
                },
                {
                  name: "backuppausetime",
                  description:
                    "Maximum time FileMaker Server pauses databases for progressive backup, in seconds.",
                },
                {
                  name: "cachesize",
                  description:
                    "Cache memory allocated by the server, in megabytes.",
                },
                {
                  name: "logsize",
                  description: "Maximum size of each log file, in megabytes.",
                },
                {
                  name: "hostedfiles",
                  description:
                    "Maximum number of databases that can be hosted.",
                },
                {
                  name: "proconnections",
                  description:
                    "Maximum number of FileMaker Pro Advanced client connections.",
                },
                {
                  name: "scriptsessions",
                  description:
                    "Maximum number of script sessions that can run on the server simultaneously.",
                },
                {
                  name: "securefilesonly",
                  description:
                    "Whether only databases with password-protected accounts assigned the Full Access privilege set can be opened for hosting.",
                },
                {
                  name: "serverdiscovery",
                  description:
                    "Whether the server is discoverable by FileMaker clients.",
                },
                {
                  name: "statsinterval",
                  description:
                    "How frequently FileMaker Server collects statistical information, in seconds.",
                },
              ],
            },
          ],
        },
        {
          name: "cwpconfig",
          displayName: "CWP Config",
          description:
            "Retrieve the Custom Web Publishing configuration settings.",
          args: [
            {
              name: "NAME",
              variadic: true,
              isOptional: false,
              suggestions: [
                {
                  name: "enablephp",
                  description:
                    "Whether Custom Web Publishing with PHP is enabled.",
                },
                {
                  name: "enablexml",
                  description:
                    "Whether Custom Web Publishing with XML is enabled.",
                },
                {
                  name: "encoding",
                  description: "The default character encoding for PHP files.",
                },
                {
                  name: "locale",
                  description:
                    "Language locale for error messages returned by the FileMaker API for PHP.",
                },
                {
                  name: "prevalidation",
                  description:
                    "Whether FileMaker API for PHP should validate record data before committing changes to the Database Server.",
                },
                {
                  name: "usefmphp",
                  description:
                    "Whether to use the FileMaker version of the PHP engine rather than your own version of PHP.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "list",
      description: "List clients, databases, plug-ins, or schedules",
      args: [
        {
          name: "NAME",
          isOptional: false,
          suggestions: [
            { name: "clients", description: "Lists the connected clients." },
            { name: "files", description: "Lists the hosted databases." },
            {
              name: "plugins",
              description: "Lists Database Server calculation plug-ins.",
            },
            { name: "schedules", description: "List schedules." },
          ],
        },
      ],
      options: [
        ...globalOpts,
        {
          name: ["-s", "--stats"],
          description: "Reports additional details for each item.",
        },
      ],
    },
    {
      name: "open",
      description: "Open databases",
      args: [
        {
          name: "FILE / PATH",
          description: "File(s) to be opened. If blank, all files.",
          variadic: true,
          isOptional: true,
        },
      ],
      options: [
        ...globalOpts,
        {
          name: "--key",
          description:
            "Specifies the encryption password for database(s) being opened.",
          args: [
            {
              name: "encryption password",
              isOptional: false,
              description:
                "The encryption password for database(s) being opened.",
            },
          ],
        },
        {
          name: "--savekey",
          description: "Saves the encryption password on the server.",
          dependsOn: ["--key"],
        },
      ],
    },
    {
      name: "pause",
      description: "Temporarily stop database access",
      args: [
        {
          name: "FILE / PATH",
          description: "File(s) to be paused. If blank, all files.",
          variadic: true,
          isOptional: true,
        },
      ],
      options: [...globalOpts],
    },
    {
      name: "remove",
      description: "Move databases out of hosted folder or remove empty folder",
      args: [
        {
          name: "FILE / PATH",
          description: "File(s) to be removed. If blank, all files.",
          variadic: true,
          isOptional: true,
        },
      ],
      options: [...globalOpts],
      isDangerous: true,
    },
    {
      name: "resetpw",
      description: "Reset admin user password",
      options: [
        {
          name: ["-p", "--password"],
          description: "Specifies the new password",
          insertValue: "-p '{cursor}'",
          args: {
            name: "password",
            description: "Specifies the new password",
            isOptional: false,
          },
        },
        {
          name: ["-z", "--pin"],
          description:
            "Specifies the PIN, a four-digit number created during installation.",
          args: [
            {
              name: "pin",
              description:
                "Specifies the PIN, a four-digit number created during installation.",
              isOptional: false,
            },
          ],
        },
      ],
    },
    {
      name: "restart",
      description: "Restart a Server process",
      args: [{ name: "TYPE", suggestions: processTypes }],
      options: [yesOpt, forceOpt, messageOpt, gracetimeOpt],
      isDangerous: true,
    },
    {
      name: "resume",
      description: "Make paused databases available",
      args: [
        {
          name: "FILE / PATH",
          description: "File(s) to be resumed. If blank, all files.",
          variadic: true,
          isOptional: true,
        },
      ],
      options: [...globalOpts],
    },
    {
      name: "run",
      insertValue: "run schedule",
      description: "Run a schedule",
      args: [
        {
          name: "SCHEDULE_NUMBER",
          description: "The ID of the schedule to run",
          isOptional: false,
        },
      ],
      options: [...globalOpts],
    },
    {
      name: "send",
      description: "Send a message",
      args: [
        {
          name: "FILE / PATH",
          description:
            "Send a message to all clients connected to these files.",
          variadic: true,
          isOptional: true,
        },
      ],
      options: [
        messageOpt,
        {
          name: ["-c", "--client"],
          description: "Specifies a CLIENT_NUMBER.",
          required: false,
        },
      ],
    },
    {
      name: "set",
      description: "Change server or CWP configuration settings",
      subcommands: [
        {
          name: "backuptime",
          displayName: "Backup Time",
          description: "Change the start time for a backup.",
          args: [
            {
              name: "ID",
              isOptional: true,
              description:
                "Backup ID. If blank, will change the default backup",
            },
            {
              name: "Start Time",
              isOptional: false,
              description: "HH:MM 24-hour format",
            },
          ],
        },
        {
          name: "serverconfig",
          displayName: "Server Config",
          options: [
            {
              name: "Backup Interval",
              description:
                "How frequently FileMaker Server runs progressive backup, in minutes.",
              insertValue: "BACKUPINTERVAL=",
            },
            {
              name: "Backup Pause Time",
              description:
                "Maximum time FileMaker Server pauses databases for progressive backup, in seconds.",
              insertValue: "BACKUPPAUSETIME=",
            },
            {
              name: "Cache Size",
              description:
                "Cache memory allocated by the server, in megabytes.",
              insertValue: "CACHESIZE=",
            },
            {
              name: "Log Size",
              description: "Maximum size of each log file, in megabytes.",
              insertValue: "LOGSIZE=",
            },
            {
              name: "Hosted File Limit",
              description: "Maximum number of databases that can be hosted.",
              insertValue: "HOSTEDFILES=",
            },
            {
              name: "Pro Client Connection Limit",
              description:
                "Maximum number of FileMaker Pro Advanced client connections.",
              insertValue: "PROCONNECTIONS=",
            },
            {
              name: "Simultaneous Script Session Limit",
              description:
                "Maximum number of script sessions that can run on the server simultaneously.",
              insertValue: "SCRIPTSESSIONS=",
            },
            {
              name: "Secure Files Only",
              description:
                "Whether only databases with password-protected accounts assigned the Full Access privilege set can be opened for hosting.",
              insertValue: "SECUREFILESONLY=",
            },
            {
              name: "Server Discovery",
              description:
                "Whether the server is discoverable by FileMaker clients.",
              insertValue: "SERVERDISCOVERY=",
            },
            {
              name: "Stats Interval",
              description:
                "How frequently FileMaker Server collects statistical information, in seconds. To reduce the overhead required to calculate statistics, increase the interval.",
              insertValue: "STATSINTERVAL=",
            },
          ],
        },
        {
          name: "cwpconfig",
          displayName: "CWP Config",
          options: [
            {
              name: "Enable PHP",
              description: "Whether Custom Web Publishing with PHP is enabled.",
              insertValue: "ENABLEPHP=",
            },
            {
              name: "Enable XML",
              description: "Whether Custom Web Publishing with XML is enabled.",
              insertValue: "ENABLEXML=",
            },
            {
              name: "Encoding",
              description: "The default character encoding for PHP files.",
              insertValue: "ENCODING=",
            },
            {
              name: "Locale",
              description:
                "Language locale for error messages returned by the FileMaker API for PHP.",
              insertValue: "LOCALE=",
            },
            {
              name: "Prevalidation",
              description:
                "Whether FileMaker API for PHP should validate record data before committing changes to the Database Server.",
              insertValue: "PREVALIDATION=",
            },
            {
              name: "Use FM PHP",
              description:
                "Whether to use the FileMaker version of the PHP engine rather than your own version of PHP.",
              insertValue: "USEFMPHP=",
            },
          ],
        },
      ],
    },
    {
      name: "start",
      description: "Start a Server process",
      args: [{ name: "TYPE", suggestions: processTypes }],
    },
    {
      name: "status",
      description: "Get status of clients of databases",
      subcommands: [
        {
          name: "client",
          description: "Retrieves the status of a client by client number",
          args: {
            name: "Client Number",
            isOptional: false,
          },
        },
        {
          name: "file",
          description: "Retrieves the status of a database by file",
          args: {
            name: "File",
            description: "Hosted file name",
            isOptional: false,
          },
        },
      ],
      options: [...globalOpts],
    },
    {
      name: "stop",
      description: "Stop a Server process",
      args: [{ name: "TYPE", suggestions: processTypes }],
      options: [yesOpt, forceOpt, messageOpt, gracetimeOpt],
      isDangerous: true,
    },
    {
      name: "verify",
      description: "Check the consistency of databases",
      args: [
        {
          name: "FILE / PATH",
          description: "File(s) to be opened. If blank, all files.",
          variadic: true,
          isOptional: true,
        },
      ],
      options: [...globalOpts, messageOpt, forceOpt, gracetimeOpt],
    },
    {
      name: "wpe",
      subcommands: [
        {
          name: "add",
          description: "Add a secondary machien to the primary machine.",
          args: [
            {
              name: "Primay Host",
              description: "network name or IP of primary machine",
              isOptional: false,
            },
            {
              name: "Secondary Host",
              description: "network name or IP of secondary machine",
              isOptional: false,
            },
          ],
          options: [...globalOpts],
        },
        {
          name: "remove",
          description: "Remove a secondary machine from the primary machine.",
          args: {
            name: "Secondary",
            description:
              "SECONDARY_HOST or SECONDARY_ID of the secondary machine",
          },
          options: [...globalOpts, forceOpt],
        },
        {
          name: "list",
          description:
            "Display secondary machines, connection status, # of client connections.",
          options: [...globalOpts],
        },
      ],
      description: "Add, remove and list FileMaker WebDirect worker machines",
    },
  ],
  options: [
    {
      name: ["-h", "--help"],
      description: "Print the CLI built-in help page.",
    },
    {
      name: ["-v", "--version"],
      description: "Print version information",
    },
  ],
  args: {},
};
