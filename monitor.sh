echo "cpu load"
uptime
echo "memory usage"
top -l 1 | grep PhysMem
echo "disk usage is"
df -h
echo "top processes by cpu are"
top -o cpu -l 1 | head -n 20
echo "top processes by memory usage"
top -o rsize -l 1 | head -n 12
echo "and the os version is"
sw_vers
