#!/bin/sh

# Extract .tar.xz content to /tmp folder
# --x extract, --f filename, --v verbose
tar -xvf file.tar.xz

# Extract .tar.gz content to /tmp folder 
# --x extract, --f filename,  --v verbose, --z gzip
tar -xfvz archive.tar.gz -C /tmp

# Set the computer to turn off at 21:45
shutdown 21:45

# Set the computer to turn off in 15 minutes
# -k don't turn off, but send warning message
shutdown +15 'Powering down...' -k

# Remove all non-hidden files inside a folder
# -r recursively, -f force
sudo rm -rf *
