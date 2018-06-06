# CUSTOMIZING TERMINAL:

Tutorial: https://www.youtube.com/watch?v=vDOVEDl2z84

In the ~ directory, there should be a:
- .bashrc //used by non-login shells
- .bash_profile //used by login-shells (this is the mac terminal)

- OR 
- .zshrc // used by zsh shell

If they don't exist, create them by:

```
touch .bashrc .bash_profile 
or
touch .zshrc

```

- These files are read upon starting a new shell process. So you can place init commands and customizations inside.

---
### **Customizing Color:**
https://www.youtube.com/watch?v=LXgXV7YmSiU&t=355s

---
### **Finding what shell you have:**

To figure out what shell you are defaulted to:

>echo $SHELL

If the response is bin/zsh, then you are defaulted to zsh.

To change this to bash, you can go into your Terminal -> Preferences -> Startup tab, and change "Shell Opens With:" from "Default login shell" to Command and value "/bin/bash".

Alternately, you can change your default shell by executing the following command at the command prompt:

>chsh -s bin/bash

After you do one of these, open a new shell window, and your .bash_profile should be sourced.

---
The order in which MacOS terminal looks for a customization file is:

>...it looks for ~/.bash_profile, ~/.bash_login, and ~/.profile, in that order, and reads and executes commands from the first one that exists and is readable. The --noprofile option may be used when the shell is started to inhibit this behavior. - [StackOverFlow](https://stackoverflow.com/questions/18773051/how-to-make-os-x-to-read-bash-profile-not-profile-file)

---
### **Running a SubShell:**

>bash

### **Add Custom Terminal Commands:**

https://www.youtube.com/watch?v=0liXeoADU6A


