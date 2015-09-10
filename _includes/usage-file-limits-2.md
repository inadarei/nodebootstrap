
Put something like this (as root) in your /etc/limits.conf or /etc/security/limits.conf:

~~~~~bash
* hard nofile 10000
~~~~~

Then log out, log back in and run:

~~~~~bash
> ulimit -n 10000
~~~~~

On certain Linux distributions you may also need to raise iNotify limit:

~~~~~bash
> sysctl fs.inotify.max_user_instances=16384 && echo sysctl fs.inotify.max_user_instances=16384  | sudo tee /etc/rc.local  
~~~~~

And last, but not least, it's a good idea to also run:

~~~~~bash
> sudo sysctl -w kern.maxfiles=40960 kern.maxfilesperproc=20480
~~~~~