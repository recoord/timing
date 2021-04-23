rm -rf merged.ts

WIDTH=1920
HEIGHT=1080

QUEUE="queue max-size-bytes=0 max-size-buffers=0 max-size-time=0"
gst-launch-1.0 -v \
	filesrc location=video.ts ! tsdemux name=dmx \
	mpegtsmux name=mux ! filesink location=merged.ts \
	videomixer name=mix ! x264enc ! mux. \
	dmx. ! $QUEUE name=AAA \
	dmx. ! $QUEUE name=BBB \
	BBB. ! libde265dec ! videoscale ! video/x-raw, width=$WIDTH, height=$HEIGHT ! videobox left=-$WIDTH ! mix. \
	AAA. ! libde265dec ! videoscale ! video/x-raw, width=$WIDTH, height=$HEIGHT ! mix. \
	dmx. ! $QUEUE ! aacparse ! mux.

ffplay -loglevel quiet -hide_banner merged.ts