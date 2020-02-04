#!/bin/sh

# Extract .tar.xz content to /tmp folder 
# -x --extract, -v --verbose, -f --file -C --directory
tar -xvf file.tar.xz -C /tmp

# Extract .tar.gz content 
# -x --extract, -v --verbose, -f --file, -z --gzip
tar -xvfz archive.tar.gz 
# Set the computer to turn off at 21:45
shutdown 21:45

# Set the computer to turn off in 15 minutes
# -k don't turn off, but send warning message
shutdown +15 'Powering down...' -k

# Remove all non-hidden files inside a folder
# -r recursively, -f force
sudo rm -rf *
