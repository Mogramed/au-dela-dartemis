import json
import os

import bpy


def serialize_fcurve_range(action):
    frames = []
    for curve in action.fcurves:
        for keyframe in curve.keyframe_points:
            frames.append(keyframe.co.x)

    if not frames:
        return None

    return {
        "start": min(frames),
        "end": max(frames),
    }


def describe_object(obj):
    animation_data = obj.animation_data
    action_name = None
    nla_tracks = []

    if animation_data:
        if animation_data.action:
            action_name = animation_data.action.name

        for track in animation_data.nla_tracks:
            strips = []
            for strip in track.strips:
                strips.append(
                    {
                        "name": strip.name,
                        "action": strip.action.name if strip.action else None,
                        "frame_start": strip.frame_start,
                        "frame_end": strip.frame_end,
                    }
                )

            nla_tracks.append(
                {
                    "name": track.name,
                    "is_solo": track.is_solo,
                    "mute": track.mute,
                    "strips": strips,
                }
            )

    return {
        "name": obj.name,
        "type": obj.type,
        "parent": obj.parent.name if obj.parent else None,
        "has_animation_data": animation_data is not None,
        "action": action_name,
        "nla_tracks": nla_tracks,
        "location": list(obj.location),
        "rotation_mode": obj.rotation_mode,
        "collections": [collection.name for collection in obj.users_collection],
    }


def main():
    output = {
        "file": bpy.data.filepath,
        "scene": bpy.context.scene.name if bpy.context.scene else None,
        "frame_start": bpy.context.scene.frame_start,
        "frame_end": bpy.context.scene.frame_end,
        "fps": bpy.context.scene.render.fps,
        "actions": [],
        "animated_objects": [],
        "collections": [],
        "objects": [],
    }

    for action in bpy.data.actions:
        output["actions"].append(
            {
                "name": action.name,
                "frame_range": list(action.frame_range),
                "keyframe_span": serialize_fcurve_range(action),
                "fcurves": len(action.fcurves),
                "users": action.users,
            }
        )

    for collection in bpy.data.collections:
        output["collections"].append(
            {
                "name": collection.name,
                "object_count": len(collection.objects),
            }
        )

    for obj in bpy.data.objects:
        description = describe_object(obj)
        output["objects"].append(description)
        if description["has_animation_data"]:
            output["animated_objects"].append(description)

    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
