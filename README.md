# Sage-Promo-Product-Performance-To-CSV
A script to run in chrome for Sage Supplier Center to download your weekly and monthly product and advertisement stats as a CSV file. It will only pull the stats for the previous month.

# You Will Need To Add The Snippet To Google Chrome
In Chrome open developer tools (Control + Shift + I || Command + Option + I)
Go to the "Sources" Tab
Go to "Snippets", this may be hidden, if you see the options "Workspace" or "Pages" click the >> directly to the right
Click "+ New Snipped"
Paste the code into your snippet

# How To Run The Snippet
In Chrome open your product/advertisement stats page in the Sage Supplier Center Website
For each type of product/advertisement that you want the stats for you will need to first click into their tab to view them. If you do not open them first, their code is not initialized by the website and they will get snipped
In Chrome open developer tools (Control + Shift + I || Command + Option + I)
Open your Snippet
Press the run button, or Ctrl+Enter

# Notes
You may need to adjust the code if the ad type you are trying to pull is missing, inspect the page to find the code for the type you want to add. Currently the program is set to pull the stats for the ad types "SR", "KW", "FP", "DW", and "BA".

# Bugs
Sometimes a calendar window that the script is manipulating will hang and not give the correct stats and not close. If you have open calendar windows after the script is done, close the calendar(s) and delete the output files and try it again.
Occasionally erroneous numbers have been spotted. You may want to run the script multiple times and verify you get the same output. 

# Possible Future Changes
Change the script to run 3 times, then compare to only keep the results if they appear the same in at least two of the outputs, to remove erroneous outputs.