
Put something like this (as root) in your /etc/limits.conf or /etc/security/limits.conf:

```bash
* hard nofile 10000
```

Then log out, log back in and run:

```bash
> ulimit -n 10000
```