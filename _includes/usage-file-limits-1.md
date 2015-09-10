
### File Limits

Hot reloading uses native file watching features of unix-compatible systems. This is extremely handy and efficient, but 
unfortunately most systems have very low limits on watched and open files. If you use hot reloading a lot, you should
expect to see: "Error: watch EMFILE" or similar.

To solve the problem you need to raise your filesystem limits. This may be a two-step process. On Linux, there're hard
limits (something root user can change in /etc/limits.conf or /ets/security/limits.conf) that govern the limits individual
users can alter from command-line.

You should probably put `ulimit -n 10000` in your .profile file, because it does not persist between restarts.

For OS-X and Solaris-specific instructions see [a Stackoverflow Answer](http://stackoverflow.com/questions/34588/how-do-i-change-the-number-of-open-files-limit-in-linux/34645#34645)
