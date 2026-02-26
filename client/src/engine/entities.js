const baseTransform = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
};

export class ObjectEntity {
  constructor(name = 'Object') {
    this.kind = 'Object';
    this.name = name;
    this.transform = structuredClone(baseTransform);
    this.physics = { bodyType: 'dynamic', mass: 1, gravityScale: 1, friction: 0.2, restitution: 0 };
    this.render = {
      visible: true,
      texture: '',
      model2d: '',
      model3d: '',
      tint: '#ffffff',
      alpha: 1,
      layer: 0,
      animationClips: [],
    };
    this.tags = [];
    this.metadata = {};
  }
}

export class PawnEntity extends ObjectEntity {
  constructor(name = 'Pawn') {
    super(name);
    this.kind = 'Pawn';
    this.controls = {
      keyboard: { enabled: true, scheme: 'WASD' },
      mouse: { enabled: false, lookSensitivity: 1 },
      gamepad: { enabled: false },
      movementSpeed: 180,
      jumpForce: 300,
    };
  }
}

export class AreaEntity {
  constructor(name = 'Area') {
    this.kind = 'Area';
    this.name = name;
    this.transform = structuredClone(baseTransform);
    this.area = {
      shape: 'box',
      size: { width: 100, height: 100, depth: 100 },
      isTrigger: true,
      emitsLight: false,
      light: { color: '#ffffff', intensity: 1, radius: 220 },
      collisionMask: ['Pawn', 'Object'],
      events: ['onEnter', 'onExit', 'onStay'],
      navModifier: 'none',
      audioZone: { enabled: false, reverb: 0 },
    };
  }
}

export class UiEntity {
  constructor(name = 'UI') {
    this.kind = 'UI';
    this.name = name;
    this.layout = {
      anchor: 'top-left',
      offset: { x: 0, y: 0 },
      width: 200,
      height: 44,
      zIndex: 100,
    };
    this.style = {
      text: 'Button',
      fontFamily: 'Inter',
      fontSize: 16,
      color: '#ffffff',
      background: '#1f2937',
      borderRadius: 8,
      padding: 8,
    };
    this.interaction = {
      clickable: true,
      hoverState: true,
      focusable: true,
      action: 'none',
    };
    this.bindings = [];
  }
}

export function createEntity(kind, index = 1) {
  if (kind === 'Pawn') return new PawnEntity(`Pawn_${index}`);
  if (kind === 'Area') return new AreaEntity(`Area_${index}`);
  if (kind === 'UI') return new UiEntity(`UI_${index}`);
  return new ObjectEntity(`Object_${index}`);
}
