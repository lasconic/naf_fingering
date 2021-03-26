//=============================================================================
//
//  6-hole Native American Flute fingering plugin
//  http://musescore.org/en/project/naffingering
//
//  Copyright (C) 2012 lasconic
//  additional development by Scott Scheiman
//  MS3 port by jeetee
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License version 2.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
//=============================================================================

import QtQuick 2.0
import MuseScore 3.0

MuseScore {
	menuPath: "Plugins.NAF Fingering (6 Hole)"
	description: "6-hole Native American Flute fingering plugin"
	version: "1.0.0"
	requiresScore: true

	onRun: {
		                 // F#   G    G#   A    A#   B    C    C#    D    D#   E    F
		var fingerings = [ '1', '!', '2', '3', '#', '4', '$', '5',  '6', '^', '7', '~', 
		                   '8', '*', '9', '0', "\u008C"];
	
		var cursor = curScore.newCursor();
		cursor.rewind(0); // beginning of score
		cursor.staff = 0;
		cursor.voice = 0;

		while (cursor.segment) {
			if ((cursor.element && (cursor.element.type == Element.CHORD))
				&& (cursor.element.notes && (cursor.element.notes.length))
				) {

				var note = cursor.element.notes[0];
				if (!(note.tieBack)) {
					var mappingIndex = note.pitch - 66; // F#

					var fingering = newElement(Element.FINGERING);
					fingering.fontFace = 'NAFTracks Six Hole';
					fingering.fontSize = 30;
					fingering.align = 2; // HCenter and top
					fingering.placement = Placement.BELOW;
					fingering.autoplace = true;
					if ((mappingIndex >= 0) && (mappingIndex < fingerings.length)) {
						fingering.text = fingerings[mappingIndex];
					}
					else {
						fingering.text = '(';
						fingering.color = '#FF0000';
					}

					note.add(fingering);
				}
			}
			cursor.next();
		}
	}
}
