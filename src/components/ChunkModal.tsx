import { useContext } from 'react';

import ClueTable from './ClueTable';
import { ChunkDataContext } from '../data';
import { Chunk, Clue, ClueDifficulty } from '../models';
import { chunkHasClues, getKillCreatureCluesForChunk } from '../utils';

const ChunkModal: React.FC<{
  chunkCoords: { x: number; y: number };
  editMode: boolean;
  goToChunk: (x: number, y: number) => void;
}> = ({ chunkCoords, editMode, goToChunk }) => {
  const { getChunk, setChunk } = useContext(ChunkDataContext);

  const { x, y } = chunkCoords;
  const chunk = getChunk(x, y) || {
    x,
    y,
  };

  function updateClues(type: ClueDifficulty, clues: Clue[]) {
    setChunk(x, y, {
      ...chunk,
      [`${type.toLowerCase()}Clues`]: clues.filter((clue) => !clue.creatures),
    } as Chunk);
  }

  const killCreatureEliteClues = getKillCreatureCluesForChunk(chunk, 'elite');
  const killCreatureMasterClues = getKillCreatureCluesForChunk(chunk, 'master');

  return (
    <div id="chunk-modal">
      <h1>
        Chunk ({x}, {y})
      </h1>

      {!editMode && !chunkHasClues(chunk) && (
        <div>This chunk has no clue steps.</div>
      )}

      <div>
        <ClueTable
          clues={chunk?.beginnerClues}
          difficulty="Beginner"
          updateClues={
            editMode
              ? (clues: Clue[]) => updateClues('Beginner', clues)
              : undefined
          }
          goToChunk={goToChunk}
        />
      </div>

      <div>
        <ClueTable
          clues={chunk?.easyClues}
          difficulty="Easy"
          updateClues={
            editMode ? (clues: Clue[]) => updateClues('Easy', clues) : undefined
          }
          goToChunk={goToChunk}
        />
      </div>

      <div>
        <ClueTable
          clues={chunk?.mediumClues}
          difficulty="Medium"
          updateClues={
            editMode
              ? (clues: Clue[]) => updateClues('Medium', clues)
              : undefined
          }
          goToChunk={goToChunk}
        />
      </div>

      <div>
        <ClueTable
          clues={chunk?.hardClues}
          difficulty="Hard"
          updateClues={
            editMode ? (clues: Clue[]) => updateClues('Hard', clues) : undefined
          }
          goToChunk={goToChunk}
        />
      </div>

      <div>
        <ClueTable
          clues={[
            ...(chunk && chunk.eliteClues ? chunk.eliteClues : []),
            ...killCreatureEliteClues,
          ]}
          difficulty="Elite"
          updateClues={
            editMode
              ? (clues: Clue[]) => updateClues('Elite', clues)
              : undefined
          }
          goToChunk={goToChunk}
        />
      </div>

      <div>
        <ClueTable
          clues={[
            ...(chunk && chunk.masterClues ? chunk.masterClues : []),
            ...killCreatureMasterClues,
          ]}
          difficulty="Master"
          updateClues={
            editMode
              ? (clues: Clue[]) => updateClues('Master', clues)
              : undefined
          }
          goToChunk={goToChunk}
        />
      </div>
    </div>
  );
};

export default ChunkModal;
